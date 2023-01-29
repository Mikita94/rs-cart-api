create table carts (
	id uuid primary key,
    user_id uuid not null,
    created_at date not null,
    updated_at date not null
);


create table products (
	id uuid primary key,
    title text,
    description text,
    price integer
);

create table cart_items (
	cart_id uuid,
    product_id uuid,
    count integer,
	foreign key(cart_id) references carts(id) on delete cascade,
	foreign key(product_id) references products(id) on delete cascade
);

create table orders (
	id uuid primary key,
    user_id uuid,
    cart_id uuid,
    payment json,
    delivery json,
    comments text,
    status text,
    total integer,
	foreign key(cart_id) references carts(id) on delete set null
);

-- carts

insert into carts (id, user_id, created_at, updated_at)
values ('789e18db-5d22-4338-b7fa-5e0b41cdd611', '155f6b9e-1086-4d4f-b749-001b6902dadc', now(), now());

insert into carts (id, user_id, created_at, updated_at)
values ('39ef58e2-6776-4aab-959d-93bb9c35b27e', 'c376d979-cb4d-459a-aacc-b9c244eb6ebd', now(), now());

insert into carts (id, user_id, created_at, updated_at)
values ('244f4532-c6cd-4b5b-8d2e-03a19ae5978a', '147eda0d-40d1-4414-8e7d-0121beb845aa', now(), now());

insert into carts (id, user_id, created_at, updated_at)
values ('ec95cc7b-eb1e-4a73-82f5-345369a0b95b', 'ffb420f2-5dc7-4c51-af34-6699ed25a6e9', now(), now());

insert into carts (id, user_id, created_at, updated_at)
values ('ac231f97-bce3-43ae-82da-ecd5176af8bd', '3ffe5625-8a78-41c9-bcb7-4617d83fa55a', now(), now());

-- products

insert into products (id, title, description, price)
values ('59081d56-37db-4d3c-9b67-40995b311b22', 'Milk', 'Organic High Vitamin D Milk, 1l', 5);

insert into products (id, title, description, price)
values ('322c2e3e-1d58-4ced-9566-5c37e041acea', 'Bread', '21 Whole Grains and Seeds Thin-Sliced Organic Bread Loaf, 500g', 3);

insert into products (id, title, description, price)
values ('3e73b896-5dc0-4725-8415-d8288b11ec7e', 'Eggs', 'Cage Free Large AA White Eggs, 18 Count', 6);

insert into products (id, title, description, price)
values ('dae3ec07-b4cb-4dd9-8587-71cb8f02f73c', 'Cheese', 'Finely Shredded Sharp Cheddar Cheese, 300g', 1);

insert into products (id, title, description, price)
values ('4525fbd0-b351-4ff4-a0f6-ff99c1642813', 'Tomatoes', 'Organic Tomato on the Vine, 500g', 9);

insert into products (id, title, description, price)
values ('1dba2277-5525-4932-a8b7-1001668a6a21', 'Avocado', 'Hass Avocados, 1pc', 15);

-- cart items

insert into cart_items (cart_id, product_id, count)
values ('789e18db-5d22-4338-b7fa-5e0b41cdd611', '59081d56-37db-4d3c-9b67-40995b311b22', 5);

insert into cart_items (cart_id, product_id, count)
values ('789e18db-5d22-4338-b7fa-5e0b41cdd611', '322c2e3e-1d58-4ced-9566-5c37e041acea', 3);

insert into cart_items (cart_id, product_id, count)
values ('39ef58e2-6776-4aab-959d-93bb9c35b27e', '3e73b896-5dc0-4725-8415-d8288b11ec7e', 2);

insert into cart_items (cart_id, product_id, count)
values ('244f4532-c6cd-4b5b-8d2e-03a19ae5978a', 'dae3ec07-b4cb-4dd9-8587-71cb8f02f73c', 6);

insert into cart_items (cart_id, product_id, count)
values ('244f4532-c6cd-4b5b-8d2e-03a19ae5978a', '4525fbd0-b351-4ff4-a0f6-ff99c1642813', 2);

insert into cart_items (cart_id, product_id, count)
values ('ac231f97-bce3-43ae-82da-ecd5176af8bd', '1dba2277-5525-4932-a8b7-1001668a6a21', 1);
