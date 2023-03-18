CREATE TABLE public.users(
	ID serial NOT NULL, 
	name varchar(100),
	lastname varchar(100),
	email varchar(100) unique,
	password varchar(100) not null,
    campus varchar(100),
	role character varying(10) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    Primary Key(ID)
);


CREATE TABLE public.student(
	ID serial NOT NULL, 
	userID integer,
    student_no integer,
    id_no varchar(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.admin(
	ID serial NOT NULL, 
	userID integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.lecture(
    ID serial NOT NULL,
    userID integer,
    stuff_no integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.location(
    ID serial NOT NULL,
    name varchar(255),
    lat numeric,
    lng numeric,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.waypoints(
    ID serial NOT NULL,
    locationID integer,
    lat numeric,
    lng numeric,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

ALTER TABLE public.waypoints
    ADD FOREIGN KEY (locationID)
    REFERENCES public.location (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.student
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;


ALTER TABLE public.admin
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.lecture
    ADD FOREIGN KEY (userID)
    REFERENCES public.users (ID)
    ON DELETE CASCADE
    NOT VALID;

CREATE UNIQUE INDEX users_unique_lower_email_idx
    ON public.users (lower(email));

-- Location values

INSERT INTO location (name, lat, lng)
VALUES ('Ruth First Hall', -25.541657366056807, 28.096021413803104);

-- First waypoint
INSERT INTO waypoints (locationID, lat, lng)
VALUES (1, -25.540737731295003, 28.096171617507938);

-- Second waypoint
INSERT INTO waypoints (locationID, lat, lng)
VALUES (1, -25.5408345352863, 28.096053600311283);

-- Third waypoint
INSERT INTO waypoints (locationID, lat, lng)
VALUES (1, -25.541212070105594, 28.096005320549015);

-- Fourth waypoint
INSERT INTO waypoints (locationID, lat, lng)
VALUES (1, -25.54143471828793, 28.096058964729313);