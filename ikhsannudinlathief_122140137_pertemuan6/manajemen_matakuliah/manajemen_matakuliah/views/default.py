from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import SQLAlchemyError
from pyramid.httpexceptions import (
    HTTPFound,
    HTTPNotFound,
    HTTPBadRequest,
)
from .. import models
from ..models.matakuliah import Matakuliah


@view_config(route_name='home', renderer='manajemen_matakuliah:templates/mytemplate.jinja2')
def my_view(request):
    try:
        # Replace MyModel with MataKuliah
        query = request.dbsession.query(models.Matakuliah)
        matakuliah_list = query.all()
    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})
    
    return {'matakuliah_list': matakuliah_list, 'project': 'Manajemen Matakuliah'}



db_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for descriptions and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""
