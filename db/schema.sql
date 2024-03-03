-- Created new database
CREATE DATABASE task_management_db;

USE task_management_db;

-- I created a table to store tasks
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status ENUM('To Do', 'In Progress', 'Done') DEFAULT 'To Do'
);

-- I created a table to store task categories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- I created a table to assign categories to tasks
CREATE TABLE IF NOT EXISTS task_categories (
    task_id INT,
    category_id INT,
    PRIMARY KEY (task_id, category_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE `registration` (
  `id` int(10) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;