use shares_db;
db.dropDatabase();

db.shares.insertMany([
  {
    'IBM': 300,
    'FB': 200
  }
]);
