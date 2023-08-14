
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
)

CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY,
    category_id INT NOT NULL,
    name TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    stock INTEGER NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false,
    FOREIGN KEY (category_id) REFERENCES categories(id),
)

CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY,
    productid INT NOT NULL,
    comment TEXT,
    points INT NOT NULL,
    created_at TIMESTAMP,
    FOREIGN KEY (productid) REFERENCES products(id),
)

CREATE TABLE IF NOT EXISTS uploads (
    id INT PRIMARY KEY,
    owner_id INT,
    filename TEXT,
    path TEXT,             
    created_at TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false
)

CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_ids TEXT NOT NULL,
    quantity TEXT NOT NULL,
    total INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT processing,
    billing TEXT NOT NULL,
    shipping TEXT NOT NULL,
    contactEmail TEXT NOT NULL,
    contactPhone INTEGER NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    isDeleted BOOLEAN DEFAULT false
)

CREATE TABLE IF NOT EXISTS billing (
    user_id INT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    updated_at TIMESTAMP
--     postcode TEXT NOT NULL,
--     city TEXT NOT NULL,
--     street TEXT NOT NULL,
--     houseNumber TEXT NOT NULL,
--     floor TEXT,
--     door TEXT
)

CREATE TABLE IF NOT EXISTS shipping (
    user_id INT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    updated_at TIMESTAMP
--     postcode TEXT NOT NULL,
--     city TEXT NOT NULL,
--     street TEXT NOT NULL,
--     houseNumber TEXT NOT NULL,
--     floor TEXT,
--     door TEXT
)

CREATE TABLE IF NOT EXISTS company (
    user_id INT PRIMARY KEY,
    company TEXT,
    taxNumber INTEGER,
    updated_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS contact (
    user_id INT PRIMARY KEY,
    email TEXT,
    phone INTEGER,
    updated_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS cart (
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)

CREATE TABLE IF NOT EXISTS favorites (
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)