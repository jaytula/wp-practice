source .env

TARGET=./backups/fictu-$(git rev-parse --short HEAD).sql
docker exec -i wp-practice_db_1 mysqldump -u $MYSQL_USER -p$MYSQL_PASS $MYSQL_DBNAME > $TARGET
gzip $TARGET