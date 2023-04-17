CREATE USER britneyky;
CREATE DATABASE project;

DROP TABLE rides;

CREATE TABLE rides (
    sunetid text PRIMARY KEY,
    name text,
    phoneNumber text,
    start text,
    destination text,
    rider_password text,
    driver text,
    num_passengers INT,
    order_time INT,
    eta_minutes INT,
    status text
);

DROP table drivers;

CREATE TABLE drivers (
    sunetid text,
    name text,
    phoneNumber text,
    rider_sunet text
);

INSERT INTO drivers(sunetid, name, phoneNumber, rider_sunet) VALUES ('jimmy7', 'Jimmy', '650-650-5555', 'NONE');
INSERT INTO drivers(sunetid, name, phoneNumber, rider_sunet) VALUES ('rachel8', 'Rachel', '650-650-5577', 'NONE');

DROP table user_credentials;

CREATE TABLE user_credentials (
    sunetid text,
    name text,
    phoneNumber text,
    email text,
    password text
);

