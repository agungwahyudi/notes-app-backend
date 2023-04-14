const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (req, h) => {
  const { title, body, tags } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((n) => n.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "catatan berhasil ditambah",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const note = notes.filter((n) => n.id == id)[0];

  if (note !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        note,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "data tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { tags, body, title } = req.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "data berhasil diubah",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "data tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "data berhasil dihapus",
    });
    response.code(200);
    return response;
  }
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
