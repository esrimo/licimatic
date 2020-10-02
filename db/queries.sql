-- Grants per Agency
select agency, count(1) from lm.grants group by agency order by count(1) desc;

-- Opened Grants per Day
select open_date, count(1) from lm.grants group by open_date order by count(1) desc;

-- Opened Grants per Year
select EXTRACT(year from open_date), count(1) from lm.grants group by EXTRACT(year from open_date) order by count(1) desc;

-- total Opened Grants
select count(1) from lm.grants;

-- Get Paginated Grants
WITH 
	grants_desc AS (SELECT * FROM lm.grants ORDER BY open_date DESC),
	w_rn AS (SELECT row_number() OVER() AS rn, gd.* FROM grants_desc gd)
SELECT * FROM w_rn wrn
WHERE
	wrn.rn BETWEEN 21 AND 40
;