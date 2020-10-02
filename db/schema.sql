create schema lm;

create table lm.grants(
    grant_id varchar(20),
    grant_number varchar(50),
    grant_title character varying,
    agency_code varchar(30),
    agency varchar(100),
    open_date date,
    close_date date,
    opp_status varchar(20),
    doc_type varchar(20),
    primary key(grant_id)
) WITH (OIDS = FALSE) TABLESPACE pg_default;

create unique index idx_grants_grant_id1 on lm.grants(grant_id);

create table lm.cfda_x_grant(
    grant_id varchar(20),
    cfda_id varchar(6),
    primary key(grant_id, cfda_id),
    constraint fk_gid foreign key(grant_id) references lm.grants(grant_id) on delete cascade
) WITH (OIDS = FALSE) TABLESPACE pg_default;