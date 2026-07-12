-- SQL script generated from Mermaid JS ERD to MySQL
-- Schema: ERD Multi-Vendor Catering System (User, Seller, & Admin Integrated)

CREATE TABLE ROLE ( 
    role_id INT,
    role_name VARCHAR(255),
    PRIMARY KEY (role_id)
);

CREATE TABLE USER ( 
    user_id INT,
    role_id INT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255),
    created_at DATETIME,
    PRIMARY KEY (user_id),
    FOREIGN KEY(role_id) REFERENCES ROLE(role_id)
);

CREATE TABLE SELLER ( 
    seller_id INT,
    user_id INT,
    seller_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    business_name VARCHAR(255),
    address VARCHAR(255),
    platform_commission_rate decimal,
    created_at DATETIME,
    PRIMARY KEY (seller_id),
    FOREIGN KEY(user_id) REFERENCES USER(user_id)
);

CREATE TABLE STORE_SCHEDULE ( 
    schedule_id INT,
    seller_id INT,
    day_of_week VARCHAR(255),
    open_time time,
    close_time time,
    cutoff_time time,
    PRIMARY KEY (schedule_id),
    FOREIGN KEY(seller_id) REFERENCES SELLER(seller_id)
);

CREATE TABLE CATEGORY ( 
    category_id INT,
    category_name VARCHAR(255),
    PRIMARY KEY (category_id)
);

CREATE TABLE MENU ( 
    menu_id INT,
    seller_id INT,
    category_id INT,
    menu_name VARCHAR(255),
    description VARCHAR(255),
    price decimal,
    is_active boolean,
    PRIMARY KEY (menu_id),
    FOREIGN KEY(seller_id) REFERENCES SELLER(seller_id),
    FOREIGN KEY(category_id) REFERENCES (category_id)
);

CREATE TABLE MENU_SCHEDULE ( 
    menu_schedule_id INT,
    menu_id INT,
    active_date DATE,
    daily_quota INT,
    available_quota INT,
    PRIMARY KEY (menu_schedule_id),
    FOREIGN KEY(menu_id) REFERENCES MENU(menu_id)
);

CREATE TABLE PACKAGE ( 
    package_id INT,
    seller_id INT,
    package_name VARCHAR(255),
    description VARCHAR(255),
    price decimal,
    is_subscription boolean,
    duration_days INT,
    PRIMARY KEY (package_id),
    FOREIGN KEY(seller_id) REFERENCES SELLER(seller_id)
);

CREATE TABLE PACKAGE_MENU_ROTATION ( 
    rotation_id INT,
    package_id INT,
    menu_id INT,
    day_of_week VARCHAR(255),
    PRIMARY KEY (rotation_id),
    FOREIGN KEY(package_id) REFERENCES PACKAGE(package_id),
    FOREIGN KEY(menu_id) REFERENCES MENU(menu_id)
);

CREATE TABLE SUBSCRIPTION ( 
    subscription_id INT,
    user_id INT,
    package_id INT,
    order_id INT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(255),
    PRIMARY KEY (subscription_id),
    FOREIGN KEY(user_id) REFERENCES USER(user_id),
    FOREIGN KEY(package_id) REFERENCES PACKAGE(package_id),
    FOREIGN KEY(order_id) REFERENCES ORDERS(order_id)
);

CREATE TABLE SUBSCRIPTION_DELIVERY ( 
    delivery_id INT,
    subscription_id INT,
    address_id INT,
    delivery_date DATE,
    delivery_status VARCHAR(255),
    PRIMARY KEY (delivery_id),
    FOREIGN KEY(subscription_id) REFERENCES SUBSCRIPTION(subscription_id),
    FOREIGN KEY(address_id) REFERENCES ADDRESS_USER(address_id)
);

CREATE TABLE ADDRESS_USER ( 
    address_id INT,
    user_id INT,
    street VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    postal_code VARCHAR(255),
    notes VARCHAR(255),
    PRIMARY KEY (address_id),
    FOREIGN KEY(user_id) REFERENCES USER(user_id)
);

CREATE TABLE ALLERGY_PROFILE ( 
    allergy_id INT,
    user_id INT,
    allergen VARCHAR(255),
    note VARCHAR(255),
    PRIMARY KEY (allergy_id),
    FOREIGN KEY(user_id) REFERENCES USER(user_id)
);

CREATE TABLE MENU_SUBSTITUTION ( 
    substitution_id INT,
    allergy_id INT,
    menu_id INT,
    substitute_menu_id INT,
    reason VARCHAR(255),
    PRIMARY KEY (substitution_id),
    FOREIGN KEY(allergy_id) REFERENCES ALLERGY_PROFILE(allergy_id),
    FOREIGN KEY(menu_id) REFERENCES MENU(menu_id),
    FOREIGN KEY(substitute_menu_id) REFERENCES (substitute_menu_id)
);

CREATE TABLE CART ( 
    cart_id INT,
    user_id INT,
    created_at DATETIME,
    PRIMARY KEY (cart_id),
    FOREIGN KEY(user_id) REFERENCES USER(user_id)
);

CREATE TABLE CART_ITEM ( 
    cart_item_id INT,
    cart_id INT,
    package_id INT,
    menu_id INT,
    quantity INT,
    subtotal decimal,
    PRIMARY KEY (cart_item_id),
    FOREIGN KEY(cart_id) REFERENCES CART(cart_id),
    FOREIGN KEY(package_id) REFERENCES PACKAGE(package_id),
    FOREIGN KEY(menu_id) REFERENCES MENU(menu_id)
);

CREATE TABLE ORDERS ( 
    order_id INT,
    user_id INT,
    seller_id INT,
    order_date DATETIME,
    order_status VARCHAR(255),
    total_amount decimal,
    admin_fee decimal,
    seller_payout decimal,
    PRIMARY KEY (order_id),
    FOREIGN KEY(user_id) REFERENCES USER(user_id),
    FOREIGN KEY(seller_id) REFERENCES SELLER(seller_id)
);

CREATE TABLE ORDER_ITEM ( 
    order_item_id INT,
    order_id INT,
    package_id INT,
    menu_id INT,
    quantity INT,
    price decimal,
    PRIMARY KEY (order_item_id),
    FOREIGN KEY(order_id) REFERENCES ORDERS(order_id),
    FOREIGN KEY(package_id) REFERENCES PACKAGE(package_id),
    FOREIGN KEY(menu_id) REFERENCES MENU(menu_id)
);

CREATE TABLE PAYMENT ( 
    payment_id INT,
    order_id INT,
    payment_method VARCHAR(255),
    payment_status VARCHAR(255),
    paid_at DATETIME,
    verification_code VARCHAR(255),
    PRIMARY KEY (payment_id),
    FOREIGN KEY(order_id) REFERENCES ORDERS(order_id)
);

CREATE TABLE FAVORITE ( 
    favorite_id INT,
    user_id INT,
    menu_id INT,
    added_at DATETIME,
    PRIMARY KEY (favorite_id),
    FOREIGN KEY(user_id) REFERENCES USER(user_id),
    FOREIGN KEY(menu_id) REFERENCES MENU(menu_id)
);

