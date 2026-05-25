const { Validator } = require("node-input-validator");
const db = require("../models/db.js"); // your mysql connection


// Create Message
exports.createMessage = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        name: 'required|string|maxLength:100',
        email: 'required|email',
        subject: 'required|string|maxLength:255',
        description: 'required|string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors)
                .map(e => e.message)
                .join(", ");

            return res.json({ status: 0, message: error_message });
        }

        const insertQuery = `
            INSERT INTO messages
            (name, email, subject, description)
            VALUES (?, ?, ?, ?)`;

        db.mainDb(
            insertQuery,
            [
                reqData.name,
                reqData.email,
                reqData.subject,
                reqData.description
            ],
            (err, result) => {
                if (err) {
                    return res.json({ status: 0, message: "DB error" });
                }

                return res.json({
                    status: 1,
                    message: "Message submitted successfully",
                    id: result.insertId
                });
            }
        );
    });
};


// List Messages
exports.getMessages = (req, res) => {
    db.mainDb(
        `SELECT * FROM messages ORDER BY id DESC`,
        [],
        (err, result) => {
            if (err) {
                return res.json({ status: 0, message: "DB error" });
            }

            return res.json({
                status: 1,
                data: result
            });
        }
    );
};


// Get Single Message
exports.getMessage = (req, res) => {
    const id = req.params.id;

    db.mainDb(
        `SELECT * FROM messages WHERE id=?`,
        [id],
        (err, result) => {
            if (err) {
                return res.json({ status: 0, message: "DB error" });
            }

            if (result.length === 0) {
                return res.json({
                    status: 0,
                    message: "Message not found"
                });
            }

            return res.json({
                status: 1,
                data: result[0]
            });
        }
    );
};


// Update Message
exports.updateMessage = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        id: 'required|integer',
        name: 'required|string|maxLength:100',
        email: 'required|email',
        subject: 'required|string|maxLength:255',
        description: 'required|string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors)
                .map(e => e.message)
                .join(", ");

            return res.json({ status: 0, message: error_message });
        }

        const updateQuery = `
            UPDATE messages
            SET name=?, email=?, subject=?, description=?
            WHERE id=?`;

        db.mainDb(
            updateQuery,
            [
                reqData.name,
                reqData.email,
                reqData.subject,
                reqData.description,
                reqData.id
            ],
            (err, result) => {
                if (err) {
                    return res.json({ status: 0, message: "DB error" });
                }

                if (result.affectedRows === 0) {
                    return res.json({
                        status: 0,
                        message: "Message not found"
                    });
                }

                return res.json({
                    status: 1,
                    message: "Message updated successfully"
                });
            }
        );
    });
};


// Delete Message
exports.deleteMessage = (req, res) => {
    const id = req.body.id;

    db.mainDb(
        `DELETE FROM messages WHERE id=?`,
        [id],
        (err, result) => {
            if (err) {
                return res.json({ status: 0, message: "DB error" });
            }

            if (result.affectedRows === 0) {
                return res.json({
                    status: 0,
                    message: "Message not found"
                });
            }

            return res.json({
                status: 1,
                message: "Message deleted successfully"
            });
        }
    );
};

//--------------------------------------------------------


// Create Demo Booking
exports.createDemoBooking = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        booking_date: 'required|date',
        booking_time: 'required|string',
        full_name: 'required|string|maxLength:150',
        email: 'required|email',
        phone_no: 'required|string|maxLength:20',
        company: 'string|maxLength:150',
        notes: 'string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors)
                .map(e => e.message)
                .join(", ");

            return res.json({
                status: 0,
                message: error_message
            });
        }

        const insertQuery = `
            INSERT INTO demo_bookings
            (booking_date, booking_time, full_name, email, phone_no, company, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.mainDb(
            insertQuery,
            [
                reqData.booking_date,
                reqData.booking_time,
                reqData.full_name,
                reqData.email,
                reqData.phone_no,
                reqData.company || '',
                reqData.notes || ''
            ],
            (err, result) => {
                if (err) {
                    return res.json({
                        status: 0,
                        message: "DB error"
                    });
                }

                return res.json({
                    status: 1,
                    message: "Demo booking created successfully",
                    id: result.insertId
                });
            }
        );
    });
};


// List Demo Bookings
exports.getDemoBookings = (req, res) => {
    db.mainDb(
        `SELECT * FROM demo_bookings ORDER BY id DESC`,
        [],
        (err, result) => {
            if (err) {
                return res.json({
                    status: 0,
                    message: "DB error"
                });
            }

            return res.json({
                status: 1,
                data: result
            });
        }
    );
};


// Get Single Demo Booking
exports.getDemoBooking = (req, res) => {
    const id = req.params.id;

    db.mainDb(
        `SELECT * FROM demo_bookings WHERE id=?`,
        [id],
        (err, result) => {
            if (err) {
                return res.json({
                    status: 0,
                    message: "DB error"
                });
            }

            if (result.length === 0) {
                return res.json({
                    status: 0,
                    message: "Demo booking not found"
                });
            }

            return res.json({
                status: 1,
                data: result[0]
            });
        }
    );
};


// Update Demo Booking
exports.updateDemoBooking = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        id: 'required|integer',
        booking_date: 'required|date',
        booking_time: 'required|string',
        full_name: 'required|string|maxLength:150',
        email: 'required|email',
        phone_no: 'required|string|maxLength:20',
        company: 'string|maxLength:150',
        notes: 'string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors)
                .map(e => e.message)
                .join(", ");

            return res.json({
                status: 0,
                message: error_message
            });
        }

        const updateQuery = `
            UPDATE demo_bookings
            SET booking_date=?, booking_time=?, full_name=?, email=?, phone_no=?, company=?, notes=?
            WHERE id=?`;

        db.mainDb(
            updateQuery,
            [
                reqData.booking_date,
                reqData.booking_time,
                reqData.full_name,
                reqData.email,
                reqData.phone_no,
                reqData.company || '',
                reqData.notes || '',
                reqData.id
            ],
            (err, result) => {
                if (err) {
                    return res.json({
                        status: 0,
                        message: "DB error"
                    });
                }

                if (result.affectedRows === 0) {
                    return res.json({
                        status: 0,
                        message: "Demo booking not found"
                    });
                }

                return res.json({
                    status: 1,
                    message: "Demo booking updated successfully"
                });
            }
        );
    });
};


// Delete Demo Booking
exports.deleteDemoBooking = (req, res) => {
    const id = req.body.id;

    db.mainDb(
        `DELETE FROM demo_bookings WHERE id=?`,
        [id],
        (err, result) => {
            if (err) {
                return res.json({
                    status: 0,
                    message: "DB error"
                });
            }

            if (result.affectedRows === 0) {
                return res.json({
                    status: 0,
                    message: "Demo booking not found"
                });
            }

            return res.json({
                status: 1,
                message: "Demo booking deleted successfully"
            });
        }
    );
};

//-----------------------------------------------------------------------

// ====================== REVIEW CONTROLLER ======================

// Create Review
exports.createReview = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        full_name: 'required|string|maxLength:150',
        company: 'string|maxLength:150',
        star_rating: 'required|integer|min:1|max:5',
        your_review: 'required|string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors)
                .map(e => e.message)
                .join(", ");

            return res.json({
                status: 0,
                message: error_message
            });
        }

        const insertQuery = `
            INSERT INTO reviews
            (full_name, company, star_rating, your_review)
            VALUES (?, ?, ?, ?)`;

        db.mainDb(
            insertQuery,
            [
                reqData.full_name,
                reqData.company || '',
                reqData.star_rating,
                reqData.your_review
            ],
            (err, result) => {
                if (err) {
                    return res.json({
                        status: 0,
                        message: "DB error"
                    });
                }

                return res.json({
                    status: 1,
                    message: "Review submitted successfully",
                    id: result.insertId
                });
            }
        );
    });
};


// List Reviews
exports.getReviews = (req, res) => {
    db.mainDb(
        `SELECT * FROM reviews ORDER BY id DESC`,
        [],
        (err, result) => {
            if (err) {
                return res.json({
                    status: 0,
                    message: "DB error"
                });
            }

            return res.json({
                status: 1,
                data: result
            });
        }
    );
};


// Get Single Review
exports.getReview = (req, res) => {
    const id = req.params.id;

    db.mainDb(
        `SELECT * FROM reviews WHERE id=?`,
        [id],
        (err, result) => {
            if (err) {
                return res.json({
                    status: 0,
                    message: "DB error"
                });
            }

            if (result.length === 0) {
                return res.json({
                    status: 0,
                    message: "Review not found"
                });
            }

            return res.json({
                status: 1,
                data: result[0]
            });
        }
    );
};


// Update Review
exports.updateReview = (req, res) => {
    const reqData = req.body;

    const v = new Validator(reqData, {
        id: 'required|integer',
        full_name: 'required|string|maxLength:150',
        company: 'string|maxLength:150',
        star_rating: 'required|integer|min:1|max:5',
        your_review: 'required|string'
    });

    v.check().then((matched) => {
        if (!matched) {
            const error_message = Object.values(v.errors)
                .map(e => e.message)
                .join(", ");

            return res.json({
                status: 0,
                message: error_message
            });
        }

        const updateQuery = `
            UPDATE reviews
            SET full_name=?, company=?, star_rating=?, your_review=?
            WHERE id=?`;

        db.mainDb(
            updateQuery,
            [
                reqData.full_name,
                reqData.company || '',
                reqData.star_rating,
                reqData.your_review,
                reqData.id
            ],
            (err, result) => {
                if (err) {
                    return res.json({
                        status: 0,
                        message: "DB error"
                    });
                }

                if (result.affectedRows === 0) {
                    return res.json({
                        status: 0,
                        message: "Review not found"
                    });
                }

                return res.json({
                    status: 1,
                    message: "Review updated successfully"
                });
            }
        );
    });
};


// Delete Review
exports.deleteReview = (req, res) => {
    const id = req.body.id;

    db.mainDb(
        `DELETE FROM reviews WHERE id=?`,
        [id],
        (err, result) => {
            if (err) {
                return res.json({
                    status: 0,
                    message: "DB error"
                });
            }

            if (result.affectedRows === 0) {
                return res.json({
                    status: 0,
                    message: "Review not found"
                });
            }

            return res.json({
                status: 1,
                message: "Review deleted successfully"
            });
        }
    );
};




// CREATE
exports.createClient = (req, res) => {
  const { service_name, content, image } = req.body;

  const sql = "INSERT INTO `our clients` (service_name, content, image) VALUES (?, ?, ?)";

  db.query(sql, [service_name, content, image], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Client created successfully",
      id: result.insertId,
    });
  });
};

// GET ALL
exports.getClients = (req, res) => {
  const sql = "SELECT * FROM `our clients` ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(results);
  });
};

// GET SINGLE
exports.getClient = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM `our clients` WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(results[0]);
  });
};

// UPDATE
exports.updateClient = (req, res) => {
  const { id, service_name, content, image } = req.body;

  const sql =
    "UPDATE `our clients` SET service_name = ?, content = ?, image = ? WHERE id = ?";

  db.query(sql, [service_name, content, image, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Client updated successfully" });
  });
};

// DELETE
exports.deleteClient = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM `our clients` WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Client deleted successfully" });
  });
};



exports.getCounts = (req, res) => {

    const query = `
        SELECT
            (SELECT COUNT(*) FROM messages) AS message_count,
            (SELECT COUNT(*) FROM reviews) AS review_count,
            (SELECT COUNT(*) FROM \`our clients\`) AS client_count,
            (select count(*) from demo_bookings) as bookings
    `;

    db.mainDb(query, [], (err, result) => {

        if (err) {
            return res.json({
                status: 0,
                message: "DB error"
            });
        }

        return res.json({
            status: 1,
            data: result[0]
        });

    });
};