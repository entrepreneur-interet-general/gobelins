<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>{{ $user_adding->name }} vous a ajouté comme co-auteur·e de «&nbsp;{{ $selection->name }}&nbsp;»</title>


</head>

<body
  style="-webkit-text-size-adjust: none; box-sizing: border-box; color: #2F3133; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; height: 100%; line-height: 1.4; margin: 0; width: 100% !important;">
  <style type="text/css">
    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      line-height: 1.4;
      background-color: #FFFFFF;
      color: #2F3133;
      -webkit-text-size-adjust: none;
    }
    @media only screen and (max-width: 600px) {
      .email-body_inner {
        width: 100% !important;
      }
      .email-footer {
        width: 100% !important;
      }
    }
    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
      }
    }
  </style>
  <span class="preheader"
    style="box-sizing: border-box; display: none !important; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; mso-hide: all; opacity: 0; overflow: hidden; visibility: hidden;">{{ $user_adding->name }}
    vous a ajouté comme co-auteur·e de «&nbsp;{{ $selection->name }}&nbsp;»</span>
  <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0"
    style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; margin: 0; padding: 0; width: 100%;">
    <tr>
      <td align="center"
        style="box-sizing: border-box; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;word-break: break-word;">
        <table class="email-content" width="100%" cellpadding="0" cellspacing="0"
          style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; margin: 0; padding: 0; width: 100%;">
          <tr>
            <td class="email-masthead"
              style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; padding: 25px 0; word-break: break-word;"
              align="center">

            </td>
          </tr>

          <tr>
            <td class="email-body" width="100%" cellpadding="0" cellspacing="0"
              style="-premailer-cellpadding: 0; -premailer-cellspacing: 0; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; margin: 0; padding: 0; width: 100%; word-break: break-word;"
              bgcolor="#FFFFFF">
              <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0"
                style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; margin: 0 auto; padding: 0; width: 570px;"
                bgcolor="#FFFFFF">

                <tr>
                  <td class="content-cell"
                    style="box-sizing: border-box; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; padding: 35px 35px 0px 35px; word-break: break-word;">
                    <a href="http://collection.mobiliernational.culture.gouv.fr"><img
                        src="{{ $message->embed(public_path('images/emails/collections-mobilier-national-mnlab@2x.jpg')) }}"
                        alt="Collection du Mobilier national" width="100%" style="padding-bottom: 60px" /></a>

                    <h1
                      style="box-sizing: border-box; color: #2F3133; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 18px; font-weight: normal; margin-top: 0;margin-bottom: 0;"
                      align="left">Bonjour, {{ $user_added->name }} !</h1>
                    <p style="box-sizing: border-box; color: #2F3133; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 18px; line-height: 1.5em; margin-top: 3px;"
                      align="left">{{ $user_adding->name }} vous invite à collaborer à sa
                      sélection de meubles, œuvres et textiles du Mobilier national. Commencez la
                      collaboration en cliquant ci-dessous :</p>

                    <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0"
                      style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; margin: 30px auto; padding: 0; text-align: center; width: 100%;">
                      <tr>
                        <td align="center"
                          style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; word-break: break-word;">

                          <table width="100%" border="0" cellspacing="0" cellpadding="0"
                            style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;">
                            <tr>
                              <td align="center"
                                style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; word-break: break-word;">
                                <table border="0" cellspacing="0" cellpadding="0"
                                  style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;">
                                  <tr>
                                    <td
                                      style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; word-break: break-word;">
                                      <a href="{{ $action_url }}" class="button button--" target="_blank"
                                        style="-webkit-text-size-adjust: none; background: #1B29B6; border-color: #1B29B6; border-radius: 3px; border-style: solid; border-width: 12px; padding-right:5px; padding-left:5px; margin-top: 10px; font-size: 18px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); box-sizing: border-box; color: #FFF; display: inline-block; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; text-decoration: none;">participez</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <p style="box-sizing: border-box; color: #2F3133; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 18px; line-height: 1.5em; padding-top: 10px; margin-bottom: 20px; "
                      align="left">Bonne collaboration ! Si vous avez des questions, n'hésitez pas
                      à nous envoyer un <a href="mailto:{{ $support_email }}"
                        style="box-sizing: border-box; color:#1B29B6; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;">message</a>.




                      <table class="body-sub"
                        style="border-top-color: #EDEFF2; border-top-style: solid; border-top-width: 1px; box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; margin-top: 25px; padding-top: 25px;">
                        <tr>
                          <td
                            style="box-sizing: border-box; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; word-break: break-word;">
                            <p class="sub"
                              style="box-sizing: border-box; color: #767676;font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif;font-size: 13px; line-height: 1.5em; margin-top: 20px; "
                              align="left">Si vous rencontrez des problèmes avec le bouton
                              ci-dessus, copiez et collez l’URL ci-dessous dans votre
                              navigateur web. {{ $action_url }}</p>

                          </td>
                        </tr>
                      </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; word-break: break-word;">
              <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0"
                style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; margin: 0 auto; padding: 0; text-align: center; width: 570px;">
                <tr>
                  <td class="content-cell" align="center"
                    style="box-sizing: border-box; font-family:'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; padding: 0px 35px 0px 35px; word-break: break-word;">


                    <p class="sub align-center"
                      style="box-sizing: border-box; color: #767676; font-family: 'Helvetica Neue',Helvetica,Arial,Verdana,sans-serif; font-size: 13px; line-height: 1.5em; margin-top: 0;"
                      align="left">
                      Mobilier national
                      <br />1 rue Berbier-du-mets
                      <br />75013 Paris
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>

</html>
