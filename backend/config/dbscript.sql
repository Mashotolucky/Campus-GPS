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

-- create alternative waypoints

CREATE TABLE public.alternative_waypoints(
    ID serial NOT NULL,
    locationID integer,
    lat numeric,
    lng numeric,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
	Primary Key(ID)
);

CREATE TABLE public.alternative_waypoints_two(
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

ALTER TABLE public.alternative_waypoints
    ADD FOREIGN KEY (locationID)
    REFERENCES public.location (ID)
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE public.alternative_waypoints_two
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

-- Second location

INSERT INTO location (name, lat, lng)
VALUES ('Building 10', -25.539885852801586, 28.095560073852543);

INSERT INTO waypoints (locationID, lat, lng)
VALUES (2, -25.540611885989474, 28.09608578681946),
       (2, -25.540486040551873, 28.096075057983402),
       (2, -25.540302112366998, 28.095828294754032),
       (2, -25.53997297701624, 28.095774650573734);


-- Third location

INSERT INTO location (name, lat, lng)
VALUES ('I-Center', -25.540079462081525, 28.095688819885257);

INSERT INTO waypoints (locationID, lat, lng)
VALUES (3, -25.540602205575894, 28.09608578681946),
       (3, -25.54050540139702, 28.096042871475223),
       (3, -25.54017626660427, 28.095817565917972);


-- One Stop Registration

INSERT INTO location (name, lat, lng)
VALUES ('One Stop Registration', -25.54050540139702, 28.095538616180423);


INSERT INTO waypoints (locationID, lat, lng)
VALUES (4, -25.540611885989474, 28.09608578681946),
       (4, -25.540640927225553, 28.095957040786747),
       (4, -25.540476360128114, 28.09586048126221);

-- Library

INSERT INTO location (name, lat, lng)
VALUES ('Library', -25.54003105979085, 28.095560073852543);

INSERT INTO waypoints (locationID, lat, lng)
VALUES (5, -25.540621566402276,  28.09608578681946),
       (5, -25.54050540139702,  28.096075057983402),
       (5, -25.540350514548276,  28.095828294754032),
       (5, -25.54019562749944,  28.095806837081913);

-- Cafeteria

INSERT INTO location (name, lat, lng)
VALUES ('Cafeteria', -25.540902298033718, 28.095281124114994);

INSERT INTO waypoints (locationID, lat, lng) VALUES 
    (6, -25.540602205575894, 28.09608578681946), 
    (6, -25.54072321068957, 28.09616625308991), 
    (6, -25.540810334295813, 28.096053600311283), 
    (6, -25.54122175046995, 28.095989227294925), 
    (6, -25.54141051741857, 28.096042871475223), 
    (6, -25.541623484901255, 28.09535622596741), 
    (6, -25.541304033535365, 28.095324039459232), 
    (6, -25.541086225297907, 28.09508264064789), 
    (6, -25.540941019586462, 28.095071911811832);

-- Building 14 


INSERT INTO location (name, lat, lng)
VALUES ('Building 14', -25.53882099617398, 28.09611797332764);

INSERT INTO waypoints (locationID, lat, lng) 
VALUES 
(7, -25.540631246814304, 28.096064329147342),
(7, -25.540476360128114, 28.096053600311283),
(7, -25.540408597139994, 28.09613943099976),
(7, -25.540040740250546, 28.09611797332764),
(7, -25.539537355309893, 28.09610724449158);

-- Building 13 

INSERT INTO location (name, lat, lng)
VALUES ('Building 13', -25.539387307466825, 28.09612333774567);


INSERT INTO waypoints (locationID, lat, lng) 
VALUES 
(8, -25.540602205575894, 28.09609115123749),
(8, -25.540486040551873, 28.096069693565372),
(8, -25.54043763842531, 28.0961287021637);

-- 12-120 Office

INSERT INTO location (name, lat, lng)
VALUES ('12-120', -25.539779367564357, 28.096116008078596);


INSERT INTO waypoints (locationID, lat, lng) 
VALUES 
(9, -25.53981808947975, 28.095918133250276),
(9, -25.53981808947975, 28.095918133250276);

-- 12-115 Office

INSERT INTO location (name, lat, lng)
VALUES ('12-115', -25.53982292971829, 28.096128780536972);

INSERT INTO waypoints (locationID, lat, lng) 
VALUES 
(10, -25.53981808947975, 28.095918133250276),
(10, -25.53981808947975, 28.095918133250276);



-- Alternatives waypoints

-- Ruth First Hall

INSERT INTO alternative_waypoints (locationID, lat, lng)
VALUES
(1, -25.54077161270084, 28.094809055328373),
(1, -25.541139467348046, 28.094798326492313),
(1, -25.541304033535365, 28.09534013271332),
(1, -25.541642845562745, 28.09534549713135),
(1, -25.541444398634297, 28.096042871475223),
(1, -25.541657366056807, 28.096021413803104);

-- Cafeteria

INSERT INTO alternative_waypoints (locationID, lat, lng)
VALUES
(6, -25.540481200340093, 28.09515774250031),
(6, -25.540529602449073, 28.095066547393802),
(6, -25.540703849879574, 28.095248937606815);


INSERT INTO alternative_waypoints_two (locationID, lat, lng)
VALUES
(6, -25.54139115671956, 28.096053600311283),
(6, -25.54141535759284, 28.096048235893253),
(6, -25.541608964403096, 28.09535086154938),
(6, -25.541318554070457, 28.095302581787113),
(6, -25.54109106548527, 28.095066547393802),
(6, -25.540916818617458, 28.095071911811832);

-- 12-120 Office

INSERT INTO alternative_waypoints (locationID, lat, lng)
VALUES
(9, -25.540447318852184, 28.096134034278048),
(9, -25.540447318852184, 28.096134034278048),
(9, -25.540079462081525, 28.09614849801066);

-- 12-115 Office

INSERT INTO alternative_waypoints (locationID, lat, lng)
VALUES
(10, -25.540447318852184, 28.096134034278048),
(10, -25.540447318852184, 28.096134034278048),
(10, -25.540079462081525, 28.09614849801066);
