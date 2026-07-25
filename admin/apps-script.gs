/**
 * Google Apps Script web app for the KM Periyava Sannadhi admin panel.
 *
 * SETUP INSTRUCTIONS:
 *  1. Create a new Google Sheet (e.g. "KM Periyava Events").
 *  2. In the sheet, name the first tab "Anusham" (or any name, but update SHEET_NAME below).
 *  3. In row 1, add these column headers exactly:
 *     A: id | B: title | C: date | D: description | E: programs | F: donors | G: mediaUrl
 *     ("programs" and "donors" cells should be pipe-separated, e.g. "Avahanthi Homam|Annadhanam")
 *  4. In Google Drive, go to https://script.google.com -> New Project.
 *  5. Paste this entire file's contents into the editor.
 *  6. Update SHEET_NAME below to match your tab name.
 *  7. Click "Deploy" -> "New deployment".
 *     - Type: "Web app"
 *     - Execute as: "Me"
 *     - Who has access: "Anyone"
 *  8. Click Deploy, copy the Web App URL.
 *  9. Put that URL in a VITE_APPS_SCRIPT_URL environment variable before building,
 *     or in .env.example as documented in the project README.
 *
 *  Optional: paste the existing eventsData from data/events.ts as rows below the header
 *  (programs/donors joined with " | ").
 */

const SHEET_NAME = "Anusham";
const ADMIN_TOKEN = "JayaJayaSankara123"; // Must match the password in admin/auth.ts

function doGet(e) {
  try {
    const action = (e.parameter.action || "list").toString();
    const token = (e.parameter.token || "").toString();

    if (action === "list") {
      return jsonResponse(listEvents());
    }

    if (token !== ADMIN_TOKEN) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    if (action === "create") {
      const event = parseEventParam(e.parameter.event);
      if (!event) return jsonResponse({ error: "Invalid event payload" }, 400);
      return jsonResponse(createEvent(event));
    }

    if (action === "update") {
      const event = parseEventParam(e.parameter.event);
      if (!event || !event.id) return jsonResponse({ error: "Invalid event payload" }, 400);
      return jsonResponse(updateEvent(event));
    }

    if (action === "delete") {
      const id = (e.parameter.id || "").toString();
      if (!id) return jsonResponse({ error: "Missing id" }, 400);
      return jsonResponse(deleteEvent(id));
    }

    return jsonResponse({ error: "Unknown action" }, 400);
  } catch (err) {
    return jsonResponse({ error: String(err && err.message ? err.message : err) }, 500);
  }
}

function jsonResponse(data, status) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  if (status) {
    return output; // Note: Apps Script ignores status code but we set payload for client.
  }
  return output;
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["id", "title", "date", "description", "programs", "donors", "mediaUrl"]);
  }
  return sheet;
}

function listEvents() {
  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return { events: [] };
  const headers = data[0].map(h => String(h).toLowerCase().trim());
  const rows = data.slice(1).filter(r => r[0]);
  const events = rows.map(row => rowToEvent_(row, headers)).filter(Boolean);
  events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { events };
}

function createEvent(event) {
  const sheet = getSheet_();
  if (!event.id) event.id = generateId_(event);
  sheet.appendRow([
    event.id,
    event.title || "ANUSHAM POOJA",
    event.date || "",
    event.description || "",
    (event.programs || []).join(" | "),
    (event.donors || []).join(" | "),
    event.mediaUrl || ""
  ]);
  return { ok: true, event };
}

function updateEvent(event) {
  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === event.id) {
      sheet.getRange(i + 1, 1, 1, 7).setValues([[
        event.id,
        event.title || "ANUSHAM POOJA",
        event.date || "",
        event.description || "",
        (event.programs || []).join(" | "),
        (event.donors || []).join(" | "),
        event.mediaUrl || ""
      ]]);
      return { ok: true, event };
    }
  }
  return { error: "Event not found" };
}

function deleteEvent(id) {
  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === id) {
      sheet.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { error: "Event not found" };
}

function rowToEvent_(row, headers) {
  const event = { programs: [], donors: [] };
  headers.forEach((h, idx) => {
    const val = row[idx];
    if (h === "id") event.id = String(val || "");
    else if (h === "title") event.title = String(val || "");
    else if (h === "date") event.date = String(val || "");
    else if (h === "description") event.description = String(val || "");
    else if (h === "programs") event.programs = String(val || "").split(" | ").map(s => s.trim()).filter(Boolean);
    else if (h === "donors") event.donors = String(val || "").split(" | ").map(s => s.trim()).filter(Boolean);
    else if (h === "mediaurl") event.mediaUrl = String(val || "");
  });
  if (!event.id) return null;
  if (event.programs.length === 0) delete event.programs;
  if (event.donors.length === 0) delete event.donors;
  return event;
}

function parseEventParam(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function generateId_(event) {
  const slug = String(event.title || "event").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const dateSlug = String(event.date || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || Date.now().toString();
  return `${slug}-${dateSlug}`;
}
