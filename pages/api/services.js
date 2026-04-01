import db, { initializeDatabase } from '../../lib/database';

export default function handler(req, res) {
  // Initialize database on first request
  try {
    initializeDatabase();
  } catch (err) {
    // Table might already exist
  }

  if (req.method === 'GET') {
    try {
      const stmt = db.prepare('SELECT * FROM services ORDER BY id DESC');
      const services = stmt.all();
      res.status(200).json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, category, price, image } = req.body;

      if (!name || !description || !category || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const stmt = db.prepare(
        'INSERT INTO services (name, description, category, price, image) VALUES (?, ?, ?, ?, ?)'
      );
      const result = stmt.run(name, description, category, parseFloat(price), image || null);

      res.status(201).json({
        id: result.lastInsertRowid,
        name,
        description,
        category,
        price: parseFloat(price),
        image,
      });
    } catch (error) {
      console.error(error);
      if (error.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ error: 'Service name already exists' });
      } else {
        res.status(500).json({ error: 'Failed to create service' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
