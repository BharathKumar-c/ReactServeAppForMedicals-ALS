-- Table: public.user

-- DROP TABLE public."user";

CREATE SEQUENCE user_seq;

CREATE TABLE public."user"
(
    id integer NOT NULL DEFAULT nextval('user_seq'::regclass),
    first_name character varying(80) COLLATE pg_catalog."default",
    last_name character varying(80) COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    is_active boolean DEFAULT true,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    email character varying(80) COLLATE pg_catalog."default",
    citizenship character varying(80) COLLATE pg_catalog."default",
    dob date,
    country character varying(80) COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to postgres;

