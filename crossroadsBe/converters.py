from datetime import datetime


class DateConverter:
    regex = '\d{1,2}-\d{1,2}-\d{4}'
    format = '%m-%d-%Y'

    def to_python(self, value):
        return datetime.strptime(value, self.format).date()

    def to_url(self, value):
        return value.strftime(self.format)