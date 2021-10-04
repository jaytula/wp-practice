source .env

SOURCE=./backups/fictu-$(git rev-parse --short HEAD).sql.gz

zcat < $SOURCE | docker exec -i wp-practice_db_1 mysql -u $MYSQL_USER -p$MYSQL_PASS $MYSQL_DBNAME
