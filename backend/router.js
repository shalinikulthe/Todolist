const router = require('express').Router();
const { Tasks } = require('./dbtable');

// Create a task
// router.post('/tasks', async (req, res) => {
//     try {
//         const content  = req.body;
//         const newTasks = await Tasks.create( content );
//         res.status(201).json(newTasks);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

router.post('/tasks', async (req, res) => {
    try {
        const { content } = req.body;
        const newTask = await Tasks.create({ content });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/task', async (req, res) => {
    const data = req.body;
    const newTask = await Tasks.create(data);
    res.status(201).json(newTask);
});

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get a task by ID
router.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Tasks.findByPk(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a task by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const task = await Tasks.findByPk(id);
        if (task) {
            task.content = content;
            await task.save();
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a task by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Tasks.findByPk(id);
        if (task) {
            await task.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
