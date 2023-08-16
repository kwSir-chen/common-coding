// 驼峰字符串转下划线，下划线转驼峰

/**
   * 驼峰转下划线分割小写。<p>首字母若大写，只转小写，前不加下划线。<p>连续大写字母，首个大写字母转前加下划线，全转小写。<p>
   * 例如：
   * <blockquote><pre>
   * StringBuilder 转换完毕为 string_builder
   * userID 转换完毕为 user_id
   * </pre></blockquote>
   *
   * @param str 需要格式化的，字段内各单词首字母大写的字符串。
   * @return 全小写、单词间以下划线分隔的字符串
   */

 /**
   * 下划线分隔的字符串转为驼峰。<p>去除下划线，后跟的第一个字母大写<p>若下划线在整个字符串首位,则只去除下划线<p>
   * 例如：
   * <blockquote><pre>
   *  string_builder转换完毕为 stringBuilder
   *  string__builder转换完毕为 stringBuilder
   *  _user_id_ 转换完毕为 userId
   *  user_i_d 转换完毕为 userID
   *  usEr_i_d 转换完毕为 userID
   * </pre></blockquote>
   *
   * @param str 需要格式化的，下划线分隔的字符串。
   * @return 根据下划线位置为依据转换为驼峰的字符串
   */

// 正则实现
function formateToUnderline(str) {
  let res = str.replace(/[A-Z]+/g,match=>{
    return '_' + match.toLowerCase()
  })
  if(/^_/.test(res)) {
    res = res.slice(1)
  }
  return res
}

function formateToHump(str) {
  let res = str.toLowerCase()
  if(/^_/.test(res)) {
    res = res.slice(1)
  }
  res = res.replace(/_+([a-z]*)/g,($0,$1)=>{
    if($1) {
      return $1[0].toUpperCase() + $1.slice(1)
    }
    return ''
  })
  
  return res
}

function log(str1,str2) {
  console.log(str1,str2,str1 === str2)
}

log(formateToUnderline('StringBuilder'),'string_builder',)
log(formateToUnderline('userID'),'user_id')
log(formateToHump('string_builder'),'stringBuilder')
log(formateToHump('string__builder'),'stringBuilder')
log(formateToHump('_user_id_'),'userId')
log(formateToHump('user_i_d'),'userID')
log(formateToHump('usEr_i_d'),'userID')