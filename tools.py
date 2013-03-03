#coding: utf-8
import re


def simple_url_checker(input_str, pattern="^((https?|ftp)://)?\S+?\.\S+?(/\S+)?$"):
    """Checks that inputted string is url
    """
    if re.search(pattern, input_str):
        return True
    return False
