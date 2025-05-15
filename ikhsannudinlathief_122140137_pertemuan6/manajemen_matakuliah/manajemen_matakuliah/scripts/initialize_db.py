import argparse
import sys
import transaction

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models

def setup_models(dbsession):
    """
    Add or update models / fixtures in the database.

    """
    matakuliah1 = models.Matakuliah(
        kode_mk='IF4021',
        nama_mk='Multimedia',
        sks=3,
        semester=6,
    )

    matakuliah2 = models.Matakuliah(
        kode_mk='IF3024',
        nama_mk='Pengolahan Sinyal Digital',
        sks=3,
        semester=6,
    )

    dbsession.add(matakuliah1)
    dbsession.add(matakuliah2)

def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        # Get the session factory
        session_factory = env['registry']['dbsession_factory']
        # Create a session with transaction management
        with transaction.manager:
            dbsession = models.get_tm_session(session_factory, transaction.manager)
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')

if __name__ == '__main__':
    main()