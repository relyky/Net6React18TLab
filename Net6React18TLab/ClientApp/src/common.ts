
export class ErrMsg extends Error {
  type: string

  constructor(message: string, type: string = "error") {
    super(message);
    this.name = "ErrMsg"
    this.type = type
    this.message = message
  }
}

// 若符合 ErrMsg 格式則回傳 ErrMsg 物件，
export function unboxErrMsg(info) {
  if (info['name'] === 'ErrMsg' && typeof info['message'] === 'string' && typeof info['type'] === 'string') {
    const errMsg = new ErrMsg(info['message'], info['type'])
    return errMsg
  }

  // 否則回傳 null。
  return null;
}