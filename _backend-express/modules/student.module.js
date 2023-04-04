const pool = require("./db-connection");

class SubjectModule {
  constructor() {}

  async getSubjectById(id) {
    const [rows] = await pool.query(`SELECT * FROM subject WHERE id = ?`, [id]);
    return rows;
  }

  async getSubjectScheduleById(subjectId) {
    const [rows] = await pool.query(
      `SELECT * FROM subject_schedule WHERE subject_id = ?`,
      [subjectId]
    );
    return rows;
  }

  async getSubjectByScheduleId(scheduleId) {
    const [rows] = await pool.query(
      `SELECT subject.* FROM subject_schedule JOIN subject ON subject.id = subject_schedule.subject_id WHERE subject_schedule.id = ?`,
      [scheduleId]
    );
    return rows;
  }

  async getSubjectScheduleByRoom(room) {
    const [rows] = await pool.query(
      `SELECT * FROM subject_schedule WHERE room = ?`,
      [room]
    );
    return rows;
  }

  async getAllSubjects() {
    const [rows] = await pool.query(`SELECT * FROM subject`);
    return rows;
  }

  async getAllSubjectSchedules() {
    const [rows] = await pool.query(`SELECT * FROM subject_schedule`);
    return rows;
  }

  async getSubjectScheduleByTimeAndDay(startTime, endTime, day) {
    const [rows] = await pool.query(
      `SELECT subject.*, subject_schedule.* FROM subject_schedule JOIN subject ON subject.id = subject_schedule.subject_id WHERE time_start <= ? AND time_end >= ? AND day = ?`,
      [startTime, endTime, day]
    );
    return rows;
  }

  async getSchedBySubjectId(id) {
    const [rows] = await pool.query(
      `SELECT s.*, ss.* FROM subject_schedule ss JOIN subject s ON s.id = ss.subject_id WHERE s.id = ?`,
      [id]
    );
    return rows;
  }
  async getSchedByScheduleId(id) {
    const [rows] = await pool.query(
      `SELECT s.*, ss.* FROM subject_schedule ss JOIN subject s ON s.id = ss.subject_id WHERE ss.id = ?`,
      [id]
    );
    return rows;
  }
}

module.exports = { SubjectModule };
