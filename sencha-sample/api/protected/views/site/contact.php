<img src="<?=Yii::app()->baseUrl?>/images/websites/contact.jpg" width="100%" alt="" />
<div class="contact-info">
    <div class="info-left-left">
        <div class="info-child-title">
            <h2><?=Yii::t('app', 'Support')?> <?=Yii::t('app', 'Products')?></h2>
        </div>
        <div class="info-left-left-content">
            <span><?=Yii::t('app', 'We are already answer any question of you about products Imeigs.')?></span>
        </div>
        <div class="info-child-title">
            <img src="<?=Yii::app()->baseUrl?>/images/websites/hr-icon.jpg" alt="" />
            <h3><?=Yii::t('app', 'Sales Department')?></h3>
        </div>
        <div class="info-left-left-content">
            <span>1900 6015</span>
            <span>Mon - Fri: 7am - 2am (CST)</span>
            <span>Sat - Sun: 9am - 10pm (CST)</span>
        </div>
        <div class="info-child-title">
            <img src="<?=Yii::app()->baseUrl?>/images/websites/hr-icon.jpg" alt="" />
            <h3><?=Yii::t('app', 'Technical Department')?></h3>
        </div>
        <div class="info-left-left-content">
            <span>1900 6015</span>
            <span>Mon - Fri: 7am - 2am (CST)</span>
            <span>Sat - Sun: 9am - 10pm (CST)</span>
        </div>
    </div>
    <div class="info-left-right">
        <div class="info-child-title">
            <h2>FAQs</h2>
        </div>
        <div class="info-left-left-content">
            <span><?=Yii::t('app', 'Please email to us with any question or feedback about our website.')?> <a href=""><?=Yii::t('app', 'Click here to view FAQs')?></a></span>
        </div>
        <div class="info-child-title">
            <img src="<?=Yii::app()->baseUrl?>/images/websites/email-icon.jpg" alt="" />
            <h3>Email</h3>
        </div>
        <div class="info-left-left-content">
            <span>info@imeigs.com</span>
        </div>
        <div class="info-child-title">
            <img src="<?=Yii::app()->baseUrl?>/images/websites/chat-icon.jpg" alt="" />
            <h3>Live Chat</h3>
        </div>
        <div class="info-left-left-content">
            <span><?=Yii::t('app', 'Live chat is available 24 hours a day, 7 day a week.')?></span>
            <a href="" onclick="javascript:poptastic('https://app.purechat.com/VisitorWidget/ChatWindow?widgetId=6fd98ef5-676f-4c6f-87b3-3032a0fa0e8f');return false;">
                <img src="<?=Yii::app()->baseUrl?>/images/websites/live-chat-connect.jpg" alt="" />
            </a>
        </div>
    </div>
</div>
<div class="contact-right">
    <a name="form"></a>
    <h2><?=Yii::t('app', 'Or leave a message below our form')?></h2>
    <?php if($mess != ''):?>
        <?=$mess?>
    <?php endif;?>
    <form method="post" action="#form">
        <div class="input">
            <input type="text" name="Contacts[fullname]" value="<?=isset($_POST["Contacts"])?$_POST["Contacts"]['fullname']:''?>" placeholder="<?=Yii::t('app', 'Full Name')?>" />
        </div>
        <div class="input">
            <input type="text" name="Contacts[email]" value="<?=isset($_POST["Contacts"])?$_POST["Contacts"]['email']:''?>" placeholder="<?=Yii::t('app', 'Email')?>" />
        </div>
        <div class="input">
            <input type="text" name="Contacts[phone]" value="<?=isset($_POST["Contacts"])?$_POST["Contacts"]['phone']:''?>" placeholder="<?=Yii::t('app', 'Phone')?>" />
        </div>
        <div class="input">
            <input type="text" name="Contacts[title]" value="<?=isset($_POST["Contacts"])?$_POST["Contacts"]['title']:''?>" placeholder="<?=Yii::t('app', 'Subject')?>" />
        </div>
        <div class="input">
            <textarea name="Contacts[description]" placeholder="<?=Yii::t('app', 'Content')?>"><?=isset($_POST["Contacts"])?$_POST["Contacts"]['description']:''?></textarea>
        </div>
        <div class="submit">
            <input type="submit" value="<?=Yii::t('app', 'Contact')?>" />
        </div>
    </form>
</div>
<div class="contact-right">
	<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3919.4736928082766!2d106.6724288!3d10.7749856!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed9307d0d37%3A0x78631b45508b8408!2zNDQyIENhbyBUaOG6r25nLCAxMiwgUXXhuq1uIDEw!5e0!3m2!1sen!2s!4v1400600036451" width="100%" height="400" frameborder="0" style="border:0"></iframe>
</div>