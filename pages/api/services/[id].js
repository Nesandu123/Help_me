import db from '../../../lib/database';

export default function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Service ID is required' });
  }

  if (req.method === 'GET') {
    try {
      const stmt = db.prepare('SELECT * FROM services WHERE id = ?');
      const service = stmt.get(id);

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.status(200).json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch service' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, description, category, price, image } = req.body;

      if (!name || !description || !category || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const stmt = db.prepare(
        'UPDATE services SET name = ?, description = ?, category = ?, price = ?, image = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?'
      );
      const result = stmt.run(name, description, category, parseFloat(price), image || null, id);

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.status(200).json({
        id,
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
        res.status(500).json({ error: 'Failed to update service' });
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      const stmt = db.prepare('DELETE FROM services WHERE id = ?');
      const result = stmt.run(id);

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }

      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
