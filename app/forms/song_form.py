from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.helper import ALLOWED_EXTENSIONS
from app.models import Song

#checking if user is signed in??

class SongForm (FlaskForm):
    song_name = StringField('Song', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    image_url = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    song_url = FileField('Song File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])

#     image_url = StringField('Image', validators=[DataRequired()])
# song_url = StringField('Song URL', validators=[DataRequired()])
