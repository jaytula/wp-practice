source .env

if [ -z "$DBDUMP_FOLDER" ]; then
  echo 'Environment variable DBDUMP_FOLDER is not set'
  exit 1
fi

REVISIONS=$(git rev-list HEAD | cut -c 1-7)
REVISION=

for revision in $REVISIONS; do
  if [ -f "$DBDUMP_FOLDER/fictu-$revision.sql.gz" ]; then
    REVISION=$revision
    break
  fi
done

echo "Restoring $revision"

SOURCE=$DBDUMP_FOLDER/fictu-$revision.sql.gz

zcat < $SOURCE | docker exec -i wp-practice_db_1 mysql -u $MYSQL_USER -p$MYSQL_PASS $MYSQL_DBNAME
