#coding: utf-8
import argparse
import sqlite3


def create_db(db_file_path, create_sql_file_path):
    """Creates db using sql file, and sqlite db's file path
    """
    conn = sqlite3.connect(db_file_path, detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
    with open(create_sql_file_path) as f:
        conn.cursor().executescript(f.read())
    conn.commit()
    conn.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--create_sql_file_path", dest="create_sql_file_path", type=str, required=False,
                        help="Path to sql file for db init")
    parser.add_argument("-p", "--db_file_path", dest="db_file_path", type=str, required=False,
                        help="Path to sqlite db file")
    args = parser.parse_args()

    if args.db_file_path and args.create_sql_file_path:
        create_db(args.db_file_path, args.create_sql_file_path)
