class YuStringCleaner:
    @staticmethod
    def clean(txt):
        txt = txt.replace("&lt;b&gt;", "")
        txt = txt.replace("&lt;/b&gt;", "")
        txt = txt.replace("<b>", "")
        txt = txt.replace("</b>", "")
        txt = txt.replace("&apos;", "")
        txt = txt.replace("&apos;", "")
        txt = txt.replace("&amp;", "")
        txt = txt.replace("&quot;", "")
        return txt
    
# <b>같은거 없애자 -> 이번주만x, 자주
# naver측에서 진짜 본인들 데이터를 그냥 줘서
#    -> html에서 글자 굵게 해주는 <b>가
# -> 대부분 사이트들이 저러는데

# -> <b>같은거 없애주는 library를 만들자
# library vs framework
#    library :
#         자주 사용되는 기능 따로 정리해놓고
#         필요할때마다 갖다쓸수있게
#    framework :
#         library + 자체툴
#         대충 구별이 잘 안되는...