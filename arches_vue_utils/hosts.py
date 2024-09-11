import re
from django_hosts import patterns, host

host_patterns = patterns(
    "",
    host(
        re.sub(r"_", r"-", r"arches_vue_utils"),
        "arches_vue_utils.urls",
        name="arches_vue_utils",
    ),
)
