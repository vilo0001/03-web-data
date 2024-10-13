/* 1. Find Countries with a Population Greater Than the Global Average */
/* Result: 38 rows */

SELECT *
FROM country
WHERE population > (
	SELECT AVG(population)
	FROM country
);

/* 2. Top 5 Most Spoken Languages */
/* Result: 5 rows */

SELECT 
	language,
    SUM((population/100*percentage)) AS total_speakers
FROM countrylanguage
INNER JOIN country ON country.code = countrylanguage.countrycode
GROUP BY language
ORDER BY total_speakers DESC
LIMIT 5;

/* 3. Calculate the Population Density */
/* Result: 239 */

SELECT 
	name,
	SUM(population/surfaceArea) AS populationDensity
FROM country
WHERE surfaceArea > 0
GROUP BY name
ORDER BY populationDensity DESC;

/* 4. Countries with No Cities */
/* Result: 7 */

SELECT name
FROM country 
WHERE name NOT IN (
	SELECT country.name AS country
	FROM city
	INNER JOIN country ON city.countrycode = country.code
);

/* 5. Average Life Expectancy by Continent */
/* Result: 7 */

SELECT 
	continent,
    AVG(lifeexpectancy) AS avg_lifeexpectancy
FROM country
GROUP BY continent
ORDER BY avg_lifeexpectancy;

/* 6. Cities in Countries with Similar Population */
/* Result: 4079 */

SELECT 
	country.name,
    city.name,
    city.population
FROM city
INNER JOIN country ON country.code = city.countrycode
WHERE city.population < (
	SELECT (population/100*10) AS ten_percent_pop
	FROM country
	WHERE name = "Japan"
);

/* 7. Rank Countries by GNP */
/* Result: 239 */

SELECT 
	name,
    GNP,
    DENSE_RANK() OVER (ORDER BY GNP DESC) AS GNP_rank
FROM country;

/* 8. Countries with a Higher GDP than Their Neighboring Countries */
/* Result:  */

?????????????????;

/* 9. Language Distribution Across Countries */
/* Result:  458 */

SELECT 
	language,
    COUNT(countrycode) AS language_count
FROM countrylanguage
INNER JOIN country ON country.code = countrylanguage.countrycode
GROUP BY language
ORDER BY language_count DESC;

/* 10. Cities with Population Greater than Their Country’s Average */
/* Result:  */

SELECT *
FROM (
	SELECT 
		country.name AS country,
		city.name AS city,
		city.population,
		AVG(city.population) OVER(PARTITION BY country.name) AS avg_city_pop
	FROM city
	INNER JOIN country ON country.code = city.countrycode
) sub
WHERE population > avg_city_pop;