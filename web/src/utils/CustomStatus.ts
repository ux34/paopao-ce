
/* 自定义状态码 */
export enum CustomStatusCodes {
  /** 'success' */
  Success = 0,
  /** 'failure' */
  Failure = -1,

  /** 'Bad Request' */
  BadRequest = 400,
  /** 'Unauthorized' */
  Unauthorized = 401,
  /** 'Not Found' */
  NotFound = 404,
  /** 'Internal Server Error' */
  InternalServerError = 500,

  TriggerAuth = 10005,
  /** '令牌已过期，请重新登录' */
  TokenExpired = 10006,
  /** '数据校验未通过' */
  DataCheckFailure = 10007,

  /** "用户名已存在" */
  ErrUsernameHasExisted = 20001,
  /** "用户名长度3~12" */
  ErrUsernameLengthLimit = 20002,
  /** "用户名只能包含字母、数字" */
  ErrUsernameCharLimit = 20003,
  /** "密码长度6~16" */
  ErrPasswordLengthLimit = 20004,
  /** "用户注册失败" */
  ErrUserRegisterFailed = 20005,
  /** "该账户已被封停" */
  ErrUserHasBeenBanned = 20006,
  /** "无权限执行该请求" */
  ErrNoPermission = 20007,
  /** "当前用户已绑定二次验证" */
  ErrUserHasBindOTP = 20008,
  /** "二次验证码验证失败" */
  ErrUserOTPInvalid = 20009,
  /** "当前用户未绑定二次验证" */
  ErrUserNoBindOTP = 20010,
  /** "当前用户密码验证失败" */
  ErrErrorOldPassword = 20011,
  /** "图形验证码验证失败" */
  ErrErrorCaptchaPassword = 20012,
  /** "拒绝操作: 账户未绑定手机号" */
  ErrAccountNoPhoneBind = 20013,
  /** "登录失败次数过多，请稍后再试" */
  ErrTooManyLoginError = 20014,
  /** "短信验证码获取失败" */
  ErrGetPhoneCaptchaError = 20015,
  /** "短信验证码获取次数已达今日上限" */
  ErrTooManyPhoneCaptchaSend = 20016,
  /** "该手机号已被绑定" */
  ErrExistedUserPhone = 20017,
  /** "手机验证码不正确" */
  ErrErrorPhoneCaptcha = 20018,
  /** "手机验证码已达最大使用次数" */
  ErrMaxPhoneCaptchaUseTimes = 20019,
  /** "昵称长度2~12" */
  ErrNicknameLengthLimit = 20020,
  /** "用户不存在" */
  ErrNoExistUsername = 20021,
  /** "无管理权限" */
  ErrNoAdminPermission = 20022,
  /** "系统不允许注册用户" */
  ErrDisallowUserRegister = 20023,

  /** "获取动态列表失败" */
  ErrGetPostsFailed = 30001,
  /** "动态发布失败" */
  ErrCreatePostFailed = 30002,
  /** "获取动态详情失败" */
  ErrGetPostFailed = 30003,
  /** "动态删除失败" */
  ErrDeletePostFailed = 30004,
  /** "动态锁定失败" */
  ErrLockPostFailed = 30005,
  /** "获取话题列表失败" */
  ErrGetPostTagsFailed = 30006,
  /** "附件下载请求不合法" */
  ErrInvalidDownloadReq = 30007,
  /** "附件下载请求失败" */
  ErrDownloadReqError = 30008,
  /** "附件下载失败:账户资金不足" */
  ErrInsuffientDownloadMoney = 30009,
  /** "附件下载失败:扣费失败" */
  ErrDownloadExecFail = 30010,
  /** "动态置顶失败" */
  ErrStickPostFailed = 30011,
  /** "更新可见性失败" */
  ErrVisblePostFailed = 30012,
  /** "动态设为亮点失败" */
  ErrHighlightPostFailed = 30013,

  /** "获取评论列表失败" */
  ErrGetCommentsFailed = 40001,
  /** "评论发布失败" */
  ErrCreateCommentFailed = 40002,
  /** "获取评论详情失败" */
  ErrGetCommentFailed = 40003,
  /** "评论删除失败" */
  ErrDeleteCommentFailed = 40004,
  /** "评论回复失败" */
  ErrCreateReplyFailed = 40005,
  /** "获取评论详情失败" */
  ErrGetReplyFailed = 40006,
  /** "评论数已达最大限制" */
  ErrMaxCommentCount = 40007,
  /** "获取评论点赞信息失败" */
  ErrGetCommentThumbs = 40008,

  /** "获取消息列表失败" */
  ErrGetMessagesFailed = 50001,
  /** "标记消息已读失败" */
  ErrReadMessageFailed = 50002,
  /** "私信发送失败" */
  ErrSendWhisperFailed = 50003,
  /** "不允许给自己发送私信" */
  ErrNoWhisperToSelf = 50004,
  /** "今日私信次数已达上限" */
  ErrTooManyWhisperNum = 50005,

  /** "获取收藏列表失败" */
  ErrGetCollectionsFailed = 60001,
  /** "获取点赞列表失败" */
  ErrGetStarsFailed = 60002,

  /** "充值请求失败" */
  ErrRechargeReqFail = 70001,
  /** "充值回调失败" */
  ErrRechargeNotifyError = 70002,
  /** "充值详情获取失败" */
  ErrGetRechargeFailed = 70003,
  /** "用户钱包账单获取失败" */
  ErrUserWalletBillsFailed = 70004,

  /** "不允许添加自己为好友" */
  ErrNoRequestingFriendToSelf = 80001,
  /** "好友id不存在" */
  ErrNotExistFriendId = 80002,
  /** "申请添加朋友请求发送失败" */
  ErrSendRequestingFriendFailed = 80003,
  /** "添加好友失败" */
  ErrAddFriendFailed = 80004,
  /** "拒绝好友失败" */
  ErrRejectFriendFailed = 80005,
  /** "删除好友失败" */
  ErrDeleteFriendFailed = 80006,
  /** "获取联系人列表失败" */
  ErrGetContactsFailed = 80007,
  /** "不允许对自己操作" */
  ErrNoActionToSelf = 80008,
  /** "关注失败"  */
  ErrFolloUserFailed = 80100,
  /** "取消关注失败"  */
  ErrUnfollowUserFailed = 80101,
  /** "获取关注列表失败"  */
  ErrListFollowsFailed = 80102,
  /** "获取粉丝列表列表失败"  */
  ErrListFollowingsFailed = 80103,
  /** "获取关注计数信息失败"  */
  ErrGetFollowCountFailed = 80104,

  /** "关注话题失败" */
  ErrFollowTopicFailed = 90001,
  /** "取消关注话题失败" */
  ErrUnfollowTopicFailed = 90002,
  /** "更新话题置顶状态失败" */
  ErrStickTopicFailed = 90003,
  /** "评论点赞失败" */
  ErrThumbsUpTweetComment = 90101,
  /** "评论点踩失败" */
  ErrThumbsDownTweetComment = 90102,
  /** "评论回复点赞失败" */
  ErrThumbsUpTweetReply = 90103,
  /** "评论回复点踩失败" */
  ErrThumbsDownTweetReply = 90104,

  /** "文件上传失败" */
  ErrFileUploadFailed = 10200,
  /** "文件类型不合法" */
  ErrFileInvalidExt = 10201,
  /** "文件大小超限" */
  ErrFileInvalidSize = 10202,
  /** "功能未实现" */
  ErrNotImplemented = 10501,

}

export const msgZh = {
  [CustomStatusCodes.Success]: "成功",
  [CustomStatusCodes.Failure]: "失败",
  [CustomStatusCodes.BadRequest]: "错误的请求",
  [CustomStatusCodes.Unauthorized]: "未经授权",
  [CustomStatusCodes.NotFound]: "未找到",
  [CustomStatusCodes.InternalServerError]: "服务器内部错误",
  [CustomStatusCodes.TokenExpired]: "令牌已过期，请重新登录",
  [CustomStatusCodes.DataCheckFailure]: "数据校验未通过",
  [CustomStatusCodes.ErrUsernameHasExisted]: "用户名已存在",
  [CustomStatusCodes.ErrUsernameLengthLimit]: "用户名长度应在3到12个字符之间",
  [CustomStatusCodes.ErrUsernameCharLimit]: "用户名只能包含字母和数字",
  [CustomStatusCodes.ErrPasswordLengthLimit]: "密码长度应在6到16个字符之间",
  [CustomStatusCodes.ErrUserRegisterFailed]: "用户注册失败",
  [CustomStatusCodes.ErrUserHasBeenBanned]: "该账户已被封停",
  [CustomStatusCodes.ErrNoPermission]: "无权限执行该请求",
  [CustomStatusCodes.ErrUserHasBindOTP]: "当前用户已绑定二次验证",
  [CustomStatusCodes.ErrUserOTPInvalid]: "二次验证码验证失败",
  [CustomStatusCodes.ErrUserNoBindOTP]: "当前用户未绑定二次验证",
  [CustomStatusCodes.ErrErrorOldPassword]: "当前用户密码验证失败",
  [CustomStatusCodes.ErrErrorCaptchaPassword]: "图形验证码验证失败",
  [CustomStatusCodes.ErrAccountNoPhoneBind]: "拒绝操作：账户未绑定手机号",
  [CustomStatusCodes.ErrTooManyLoginError]: "登录失败次数过多，请稍后再试",
  [CustomStatusCodes.ErrGetPhoneCaptchaError]: "短信验证码获取失败",
  [CustomStatusCodes.ErrTooManyPhoneCaptchaSend]: "短信验证码获取次数已达今日上限",
  [CustomStatusCodes.ErrExistedUserPhone]: "该手机号已被绑定",
  [CustomStatusCodes.ErrErrorPhoneCaptcha]: "手机验证码不正确",
  [CustomStatusCodes.ErrMaxPhoneCaptchaUseTimes]: "手机验证码已达最大使用次数",
  [CustomStatusCodes.ErrNicknameLengthLimit]: "昵称长度应在2到12个字符之间",
  [CustomStatusCodes.ErrNoExistUsername]: "用户不存在",
  [CustomStatusCodes.ErrNoAdminPermission]: "无管理权限",
  [CustomStatusCodes.ErrDisallowUserRegister]: "系统不允许注册用户",
  [CustomStatusCodes.ErrGetPostsFailed]: "获取动态列表失败",
  [CustomStatusCodes.ErrCreatePostFailed]: "动态发布失败",
  [CustomStatusCodes.ErrGetPostFailed]: "获取动态详情失败",
  [CustomStatusCodes.ErrDeletePostFailed]: "动态删除失败",
  [CustomStatusCodes.ErrLockPostFailed]: "动态锁定失败",
  [CustomStatusCodes.ErrGetPostTagsFailed]: "获取话题列表失败",
  [CustomStatusCodes.ErrInvalidDownloadReq]: "附件下载请求不合法",
  [CustomStatusCodes.ErrDownloadReqError]: "附件下载请求失败",
  [CustomStatusCodes.ErrInsuffientDownloadMoney]: "附件下载失败：账户资金不足",
  [CustomStatusCodes.ErrDownloadExecFail]: "附件下载失败：扣费失败",
  [CustomStatusCodes.ErrStickPostFailed]: "动态置顶失败",
  [CustomStatusCodes.ErrVisblePostFailed]: "更新可见性失败",
  [CustomStatusCodes.ErrHighlightPostFailed]: "动态设为亮点失败",
  [CustomStatusCodes.ErrGetCommentsFailed]: "获取评论列表失败",
  [CustomStatusCodes.ErrCreateCommentFailed]: "评论发布失败",
  [CustomStatusCodes.ErrGetCommentFailed]: "获取评论详情失败",
  [CustomStatusCodes.ErrDeleteCommentFailed]: "评论删除失败",
  [CustomStatusCodes.ErrCreateReplyFailed]: "评论回复失败",
  [CustomStatusCodes.ErrGetReplyFailed]: "获取评论详情失败",
  [CustomStatusCodes.ErrMaxCommentCount]: "评论数已达最大限制",
  [CustomStatusCodes.ErrGetCommentThumbs]: "获取评论点赞信息失败",
  [CustomStatusCodes.ErrGetMessagesFailed]: "获取消息列表失败",
  [CustomStatusCodes.ErrReadMessageFailed]: "标记消息已读失败",
  [CustomStatusCodes.ErrSendWhisperFailed]: "私信发送失败",
  [CustomStatusCodes.ErrNoWhisperToSelf]: "不允许给自己发送私信",
  [CustomStatusCodes.ErrTooManyWhisperNum]: "今日私信次数已达上限",
  [CustomStatusCodes.ErrGetCollectionsFailed]: "获取收藏列表失败",
  [CustomStatusCodes.ErrGetStarsFailed]: "获取点赞列表失败",
  [CustomStatusCodes.ErrRechargeReqFail]: "充值请求失败",
  [CustomStatusCodes.ErrRechargeNotifyError]: "充值回调失败",
  [CustomStatusCodes.ErrGetRechargeFailed]: "充值详情获取失败",
  [CustomStatusCodes.ErrUserWalletBillsFailed]: "用户钱包账单获取失败",
  [CustomStatusCodes.ErrNoRequestingFriendToSelf]: "不允许添加自己为好友",
  [CustomStatusCodes.ErrNotExistFriendId]: "好友ID不存在",
  [CustomStatusCodes.ErrSendRequestingFriendFailed]: "申请添加朋友请求发送失败",
  [CustomStatusCodes.ErrAddFriendFailed]: "添加好友失败",
  [CustomStatusCodes.ErrRejectFriendFailed]: "拒绝好友失败",
  [CustomStatusCodes.ErrDeleteFriendFailed]: "删除好友失败",
  [CustomStatusCodes.ErrGetContactsFailed]: "获取联系人列表失败",
  [CustomStatusCodes.ErrNoActionToSelf]: "不允许对自己操作",
  [CustomStatusCodes.ErrFolloUserFailed]: "关注失败",
  [CustomStatusCodes.ErrUnfollowUserFailed]: "取消关注失败",
  [CustomStatusCodes.ErrListFollowsFailed]: "获取关注列表失败",
  [CustomStatusCodes.ErrListFollowingsFailed]: "获取粉丝列表列表失败",
  [CustomStatusCodes.ErrGetFollowCountFailed]: "获取关注计数信息失败",
  [CustomStatusCodes.ErrFollowTopicFailed]: "关注话题失败",
  [CustomStatusCodes.ErrUnfollowTopicFailed]: "取消关注话题失败",
  [CustomStatusCodes.ErrStickTopicFailed]: "更新话题置顶状态失败",
  [CustomStatusCodes.ErrThumbsUpTweetComment]: "评论点赞失败",
  [CustomStatusCodes.ErrThumbsDownTweetComment]: "评论点踩失败",
  [CustomStatusCodes.ErrThumbsUpTweetReply]: "评论回复点赞失败",
  [CustomStatusCodes.ErrThumbsDownTweetReply]: "评论回复点踩失败",
  [CustomStatusCodes.ErrFileUploadFailed]: "文件上传失败",
  [CustomStatusCodes.ErrFileInvalidExt]: "文件类型不合法",
  [CustomStatusCodes.ErrFileInvalidSize]: "文件大小超限",
  [CustomStatusCodes.ErrNotImplemented]: "功能未实现"
};



export const msgEn = {
  [CustomStatusCodes.Success]: "success",
  [CustomStatusCodes.Failure]: "failure",
  [CustomStatusCodes.BadRequest]: "Bad Request",
  [CustomStatusCodes.Unauthorized]: "Unauthorized",
  [CustomStatusCodes.NotFound]: "Not Found",
  [CustomStatusCodes.InternalServerError]: "Internal Server Error",
  [CustomStatusCodes.TokenExpired]: "Token has expired, please log in again",
  [CustomStatusCodes.DataCheckFailure]: "Data validation failed",
  [CustomStatusCodes.ErrUsernameHasExisted]: "Username already exists",
  [CustomStatusCodes.ErrUsernameLengthLimit]: "Username length should be 3~12",
  [CustomStatusCodes.ErrUsernameCharLimit]: "Username can only contain letters and numbers",
  [CustomStatusCodes.ErrPasswordLengthLimit]: "Password length should be 6~16",
  [CustomStatusCodes.ErrUserRegisterFailed]: "User registration failed",
  [CustomStatusCodes.ErrUserHasBeenBanned]: "The account has been suspended",
  [CustomStatusCodes.ErrNoPermission]: "No permission to execute this request",
  [CustomStatusCodes.ErrUserHasBindOTP]: "The current user has bound two-factor authentication",
  [CustomStatusCodes.ErrUserOTPInvalid]: "Two-factor verification code verification failed",
  [CustomStatusCodes.ErrUserNoBindOTP]: "The current user has not bound two-factor authentication",
  [CustomStatusCodes.ErrErrorOldPassword]: "Current user password verification failed",
  [CustomStatusCodes.ErrErrorCaptchaPassword]: "Image verification code verification failed",
  [CustomStatusCodes.ErrAccountNoPhoneBind]: "Refuse operation: Account not bound to mobile phone",
  [CustomStatusCodes.ErrTooManyLoginError]: "Too many failed login attempts, please try again later",
  [CustomStatusCodes.ErrGetPhoneCaptchaError]: "Failed to get SMS verification code",
  [CustomStatusCodes.ErrTooManyPhoneCaptchaSend]: "SMS verification code acquisition limit reached for today",
  [CustomStatusCodes.ErrExistedUserPhone]: "This phone number has been bound",
  [CustomStatusCodes.ErrErrorPhoneCaptcha]: "Incorrect SMS verification code",
  [CustomStatusCodes.ErrMaxPhoneCaptchaUseTimes]: "Maximum usage of SMS verification code has been reached",
  [CustomStatusCodes.ErrNicknameLengthLimit]: "Nickname length should be 2~12",
  [CustomStatusCodes.ErrNoExistUsername]: "User does not exist",
  [CustomStatusCodes.ErrNoAdminPermission]: "No administrative privileges",
  [CustomStatusCodes.ErrDisallowUserRegister]: "System does not allow user registration",
  [CustomStatusCodes.ErrGetPostsFailed]: "Failed to get dynamic list",
  [CustomStatusCodes.ErrCreatePostFailed]: "Failed to post dynamic",
  [CustomStatusCodes.ErrGetPostFailed]: "Failed to get dynamic details",
  [CustomStatusCodes.ErrDeletePostFailed]: "Failed to delete dynamic",
  [CustomStatusCodes.ErrLockPostFailed]: "Failed to lock dynamic",
  [CustomStatusCodes.ErrGetPostTagsFailed]: "Failed to get topic list",
  [CustomStatusCodes.ErrInvalidDownloadReq]: "Invalid attachment download request",
  [CustomStatusCodes.ErrDownloadReqError]: "Attachment download request failed",
  [CustomStatusCodes.ErrInsuffientDownloadMoney]: "Attachment download failed: Insufficient account funds",
  [CustomStatusCodes.ErrDownloadExecFail]: "Attachment download failed: Deduction failed",
  [CustomStatusCodes.ErrStickPostFailed]: "Failed to pin dynamic",
  [CustomStatusCodes.ErrVisblePostFailed]: "Failed to update visibility",
  [CustomStatusCodes.ErrHighlightPostFailed]: "Failed to set dynamic as highlight",
  [CustomStatusCodes.ErrGetCommentsFailed]: "Failed to get comment list",
  [CustomStatusCodes.ErrCreateCommentFailed]: "Failed to post comment",
  [CustomStatusCodes.ErrGetCommentFailed]: "Failed to get comment details",
  [CustomStatusCodes.ErrDeleteCommentFailed]: "Failed to delete comment",
  [CustomStatusCodes.ErrCreateReplyFailed]: "Failed to reply to comment",
  [CustomStatusCodes.ErrGetReplyFailed]: "Failed to get comment reply details",
  [CustomStatusCodes.ErrMaxCommentCount]: "Comment limit reached",
  [CustomStatusCodes.ErrGetCommentThumbs]: "Failed to get comment like information",
  [CustomStatusCodes.ErrGetMessagesFailed]: "Failed to get message list",
  [CustomStatusCodes.ErrReadMessageFailed]: "Failed to mark message as read",
  [CustomStatusCodes.ErrSendWhisperFailed]: "Failed to send private message",
  [CustomStatusCodes.ErrNoWhisperToSelf]: "Cannot send private message to yourself",
  [CustomStatusCodes.ErrTooManyWhisperNum]: "Today's private message limit reached",
  [CustomStatusCodes.ErrGetCollectionsFailed]: "Failed to get collection list",
  [CustomStatusCodes.ErrGetStarsFailed]: "Failed to get like list",
  [CustomStatusCodes.ErrRechargeReqFail]: "Failed to make recharge request",
  [CustomStatusCodes.ErrRechargeNotifyError]: "Recharge callback failed",
  [CustomStatusCodes.ErrGetRechargeFailed]: "Failed to get recharge details",
  [CustomStatusCodes.ErrUserWalletBillsFailed]: "Failed to get user wallet bill",
  [CustomStatusCodes.ErrNoRequestingFriendToSelf]: "Cannot add yourself as a friend",
  [CustomStatusCodes.ErrNotExistFriendId]: "Friend ID does not exist",
  [CustomStatusCodes.ErrSendRequestingFriendFailed]: "Failed to send friend request",
  [CustomStatusCodes.ErrAddFriendFailed]: "Failed to add friend",
  [CustomStatusCodes.ErrRejectFriendFailed]: "Failed to reject friend request",
  [CustomStatusCodes.ErrDeleteFriendFailed]: "Failed to delete friend",
  [CustomStatusCodes.ErrGetContactsFailed]: "Failed to get contact list",
  [CustomStatusCodes.ErrNoActionToSelf]: "Cannot perform action on yourself",
  [CustomStatusCodes.ErrFolloUserFailed]: "Failed to follow",
  [CustomStatusCodes.ErrUnfollowUserFailed]: "Failed to unfollow",
  [CustomStatusCodes.ErrListFollowsFailed]: "Failed to get following list",
  [CustomStatusCodes.ErrListFollowingsFailed]: "Failed to get fans list",
  [CustomStatusCodes.ErrGetFollowCountFailed]: "Failed to get following count information",
  [CustomStatusCodes.ErrFollowTopicFailed]: "Failed to follow topic",
  [CustomStatusCodes.ErrUnfollowTopicFailed]: "Failed to unfollow topic",
  [CustomStatusCodes.ErrStickTopicFailed]: "Failed to update topic pin status",
  [CustomStatusCodes.ErrThumbsUpTweetComment]: "Failed to like comment",
  [CustomStatusCodes.ErrThumbsDownTweetComment]: "Failed to dislike comment",
  [CustomStatusCodes.ErrThumbsUpTweetReply]: "Failed to like comment reply",
  [CustomStatusCodes.ErrThumbsDownTweetReply]: "Failed to dislike comment reply",
  [CustomStatusCodes.ErrFileUploadFailed]: "File upload failed",
  [CustomStatusCodes.ErrFileInvalidExt]: "Invalid file type",
  [CustomStatusCodes.ErrFileInvalidSize]: "File size exceeded limit",
  [CustomStatusCodes.ErrNotImplemented]: "Function not implemented"
}