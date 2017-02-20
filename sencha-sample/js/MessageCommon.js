function MessageCommon(){}
MessageCommon.EmployeeNull = '利用者を選択してください。';
MessageCommon.EmployeeNotExists = 'スタッフが存在しません。';
MessageCommon.PasswordWrong = 'パスワードが違います。';

MessageCommon.InputMsgTitle = "題名を入力してください。"; 
MessageCommon.InputMsgText = "本文を入力してください。"; 
MessageCommon.InvalidExpilationDate = "伝達期限を正しく設定してください。" + "過去の日付は指定できません。" ;//add new and in put pass date
MessageCommon.InvalidEmp = "メンバーを選択してください。" ;//Checked Emp = 0

MessageCommon.ErrTitle     = 'エラー';
MessageCommon.InfoTitle    = '通知';
MessageCommon.ConfirmTitle = '確認';
MessageCommon.MesErrorServerFail= 'サーバーへ接続できない。';

MessageCommon.MesErrorExecute= 'エラーの執行';
MessageCommon.MesErrorParamInvalid='パラメータが不正です';
MessageCommon.MesErrorFormatInvalid= 'フォーマットが不正です';
MessageCommon.MesErrorCaculate= '年齢変換処理に失敗しました';

MessageCommon.NotCommentOnCloseMessage = 'クローズした伝達事項にはコメントできません。';
MessageCommon.CommentNull = 'コメントが入力されていません。';
MessageCommon.CircleGroupNull = 'サークルグループを選んでください。';///Please choose circle group!
MessageCommon.MesErrorCircleGroupEmployeesNull = 'このサークルグループはメンバーが居ない';///This circle group not have member!


MessageCommon.UpdateSuccessfully = '更新できました！';
MessageCommon.UpdateFail = '更新できませんでした！';
MessageCommon.AddSuccessfully = '追加できました。';
MessageCommon.AddFail = '追加できません。';//Add fail
MessageCommon.OperationSuccessfully = '作業できました。';
MessageCommon.OperationFail = '作業できませんでした';

MessageCommon.DownloadFail = 'ダウンロードが失敗！';
MessageCommon.AttachFolderNotExists = '添付フォルダがありません。！';


MessageCommon.MesErrorAtServer = 'サーバー上でエラーが発生しました。';
MessageCommon.MesErrorInputCircle = 'サークル名を入力してください。';
MessageCommon.MesErrorInputMember = 'メンバーを入力してください。';
MessageCommon.TitleError = "エラー";
MessageCommon.TitleInfo = "情報";
MessageCommon.ChoseCircle = "サークルを選んでください";





MessageCommon.ScheduleNoteTitle = 'スケジュールが保存できません';
MessageCommon.MissingScheduleTitle = '・タイトルを入力してください';
MessageCommon.InvalidScheduleTitle = '・タイトルを入力してください';

MessageCommon.ScheduleSuccessTitle = '報告';
MessageCommon.AddScheduleSuccess = 'スケジュールが追加されました';

MessageCommon.ScheduleErrorTitle = 'エラー';
MessageCommon.ScheduleError = 'スケジュールの追加ができませんでした';
MessageCommon.InsertNullScheduleError = 'スケジュールを追加できませんでした。';//This schedule is added not successful

MessageCommon.EditScheduleSuccess = 'スケジュールが更新されました。';//Schedule has been updated success
MessageCommon.EditScheduleError = 'スケジュール編集にはエラーが発生しました。';//Edit schedule has been error
MessageCommon.EditNullScheduleError = 'スケジュール編集はヌルです。';//'Edit schedule has been null
MessageCommon.ScheduleDeleteError = 'このスケジュールを削除できません。';
MessageCommon.CheckRoomError = '■指定の会議室は予約が入っています';


MessageCommon.InsertGroupMemberError = '追加できません';//insert fail
MessageCommon.UpdateGroupMemberError = '更新できませんでした！';//Update fail
MessageCommon.MissingGroupMemberError = 'グループ名が未入力です。';//Update fail

MessageCommon.MissingSelectGroupError = 'グループ名を入力してください。';//Update fail

//Success
MessageCommon.ScheduleDeleteSuccessTitle = 'スケジュールを削除する';//Delete Schedule
MessageCommon.ScheduleDeleteConfirm = 'このスケジュールを削除ｓじたいですか？';//Delete Schedule?
MessageCommon.ScheduleDeleteSuccess = 'スケジュールを削除できました。';//Delete Schedule success
//Fail
MessageCommon.ScheduleDeleteFail = 'スケジュールを削除できませんでした。';//Delete Schedule fail


MessageCommon.TitleWarning = '報告';
MessageCommon.CheckGroupAddWarning = '---新規グループを選んでください。';//Please choose '---新規グループ'
MessageCommon.CheckNumberWarning = 'グループに追加したいスタッフを選んでください。';//Please select members to join into group
MessageCommon.CheckGroupEditWarning = '変更したいグループを選んでください。';//Please choose Group which you want to modify

MessageCommon.DeleteConfirm = 'あなたが削除してもよろしいですか？';

MessageCommon.HaveRoomOnAllDay = '■会議室チェックに失敗しました<br/>・開始日時、終了日時が不明';


MessageCommon.showErrorMessage = function(message){
    if(screenType == 1){
        Ext.Msg.show({
            title: 'エラー',
            message : message,
            buttons : Ext.MessageBox.OK,
            iconCls : Ext.MessageBox.ERROR
        });
    }else{
        Ext.MessageBox.show({
            title: 'エラー',
            msg     : message,
            buttons : Ext.MessageBox.OK,
            icon    : Ext.MessageBox.ERROR
        });
    }
};

MessageCommon.showErrorMessageForcus = function(message,cmp) {
    Ext.MessageBox.show({
        title: 'エラー',
        msg     : message,
        buttons : Ext.MessageBox.OK,
        icon    : Ext.MessageBox.ERROR,
        fn:function() {
            Ext.getCmp(cmp).focus(false,50);
        }
    });
};

MessageCommon.showInfoMessage = function(message){
    if(screenType == 1){
        Ext.Msg.show({
            title	: '情報',
            message : message,
            buttons : Ext.MessageBox.OK,
            iconCls : Ext.MessageBox.INFO
        });
    }else{
        Ext.MessageBox.show({
            title: '情報',
            msg     : message,
            buttons : Ext.MessageBox.OK,
            icon    : Ext.MessageBox.INFO
        });
    }
};
//Operation fail
MessageCommon.showMessageFail = function(){
    Ext.MessageBox.show({
        msg     : '保存は失敗しました ',
        buttons : Ext.MessageBox.OK,
        icon    : Ext.MessageBox.INFO
    });
};

MessageCommon.showMessageSuccess = function(){
    Ext.MessageBox.show({
        msg     : '作業できました。',
        buttons : Ext.MessageBox.OK,
        icon    : Ext.MessageBox.INFO
    });
};

MessageCommon.showErrorSM = function(message){
    Ext.Msg.alert(MessageCommon.TitleError,message);
};

MessageCommon.showInfoSM = function(message){
    Ext.Msg.alert(MessageCommon.TitleInfo,message);
};



