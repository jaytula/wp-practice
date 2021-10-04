source .env

if [ -z "$DBDUMP_FOLDER" ]; then
  echo 'Environment variable DBDUMP_FOLDER is not set'
  exit 1
fi

SOURCE=$DBDUMP_FOLDER/fictu-$(git rev-parse --short HEAD).sql.gz

zcat < $SOURCE | docker exec -i wp-practice_db_1 mysql -u $MYSQL_USER -p$MYSQL_PASS $MYSQL_DBNAME
