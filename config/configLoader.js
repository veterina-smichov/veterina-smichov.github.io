import chalk from 'chalk'

/**
 * Logs a task with simple indentation
 * @param {Object} task - The task to log
 */
const logTask = ({ task }) => {
    if (!task.echo) return

    console.group(
        chalk.yellow(` ${task.name}`) +
        chalk.gray(` (/src/config/${task.name.toLowerCase().replace(/\s/g, '')}.js)`)
    )
}

/**
 * Logs a subtask with indentation
 * @param {string} taskName - Name of the subtask
 */
const logSubtask = ({ taskName }) => {
    console.log(` ${chalk.green(taskName)}`)
}

/**
 * Process a task and its subtasks
 * @param {Object} task - The task to process
 * @param {Object} config - Eleventy config object
 */
const processTask = ({ task, config }) => {
    // Skip logging group if there are no subtasks
    const entries = Object.entries(task.config)
    if (entries.length === 0) return

    // Only start group if there are entries and echo is enabled
    if (task.echo) {
        logTask({ task })
    }

    // Execute each config function in the task
    entries.forEach(([taskName, taskFn]) => {
        if (task.echo) {
            logSubtask({ taskName })
        }

        // Run the task
        taskFn(config)
    })

    if (task.echo) {
        console.groupEnd()
    }
}

/**
 * Loader for Eleventy build process
 * @param {string} siteName - The site name to display in the header
 * @param {Array} tasks - Array of task objects to process and log
 * @param {Object} config - Eleventy config object
 */
export const configLoad = ({ siteName, tasks, config }) => {
    // Start console output
    console.group(chalk.magenta(siteName))

    // Process each task
    tasks.forEach(task => {
        processTask({ task, config })
    })

    console.groupEnd()
}
