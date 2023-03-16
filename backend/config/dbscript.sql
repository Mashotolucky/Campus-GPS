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