import React from 'react'

export const InviteByEmail = () => {

    function focused(e) {
        if (e.target.name === "teamInput") {
            document.getElementById('messageLabel').classList.remove('text-primary');
            document.getElementById('invitesLabel').classList.remove('text-primary');
            document.getElementById('emailsLabel').classList.remove('text-primary');
            document.getElementById('teamLabel').classList.add('text-primary');
        }else if (e.target.name === "emailsInput") {
            document.getElementById('messageLabel').classList.remove('text-primary');
            document.getElementById('invitesLabel').classList.remove('text-primary');
            document.getElementById('teamLabel').classList.remove('text-primary');
            document.getElementById('emailsLabel').classList.add('text-primary');
      
        }else if (e.target.name === "messageInput") {
            document.getElementById('emailsLabel').classList.remove('text-primary');
            document.getElementById('invitesLabel').classList.remove('text-primary');
            document.getElementById('teamLabel').classList.remove('text-primary');
            document.getElementById('messageLabel').classList.add('text-primary');
        }else if (e.target.name === "invitesInput") {
            document.getElementById('messageLabel').classList.remove('text-primary');
            document.getElementById('invitesLabel').classList.remove('text-primary');
            document.getElementById('teamLabel').classList.remove('text-primary');
            document.getElementById('invitesLabel').classList.add('text-primary');
        }
    }

  return (
    <form className='px-5 dashboard-modal-form'>
              <div className="row mb-3">
                <label id="teamLabel" className="col-sm-2 col-form-label">Team</label>
                <div className="col-sm-10">
                  <select onFocus={focused} name="teamInput" className="form-select" aria-label="Default select example">
                    <option>- Choose a team -</option>
                    <option value="1">Default Team</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label id="emailsLabel" className="col-sm-2 col-form-label">Emails</label>
                <div className="col-sm-10">
                  <textarea onFocus={focused} name="emailsInput" placeholder="Insert emails, separated with a comma" id="invite" className="w-100"></textarea>
                  <span style={{ color: '#546e7a' }}>Import contacts from <i className="fab fa-google"></i> <a href="/">Google Workspace</a> or <a href="/">Google Contacts</a></span>
                  <div className="form-check form-switch mt-3">
                    <input className="form-check-input" type="checkbox" role="switch" aria-checked="false" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Invitee is a team manager </label>
                    <i className="fa fa-question-circle mx-1" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" title="Team managers are responsible for <b>adding and updating team OKRs</b>.<br><br>Team managers have rights to <b>invite new people</b> and manage existing users for the team they are a part of."></i>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label id="messageLabel" className="col-sm-2 col-form-label">Your message</label>
                <div className="col-sm-10">
                  <textarea onFocus={focused} name="messageInput" placeholder="Add your personal message to invitees (optional)" id="invite" className="w-100"></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <label id="invitesLabel" className="col-sm-2 col-form-label">Send invites in</label>
                <div className="col-sm-10">
                  <select onFocus={focused} name="invitesInput" className="form-select" id="language">
                    <option value="en" message="Join me and our team on Weekdone! From now on we'll use this for high-level status updates and goal-setting to keep everyone on same page. Enjoy it!">English (US)</option>
                    <option value="et" message="Tulge ja liituge. Kasutame Weekdone teenust edaspidi tiimisuhtluseks ja iganädalaseks raporteerimiseks. Nii teame, kes mida teeb.">Eesti (ET)</option>
                    <option value="ru" message="Присоединяйтесь к нашей команде на Weekdone. Мы будем использовать этот сервис для совместной работы.">Русский (RU)</option>
                    <option value="es" message="Únete al equipo en Weekdone. Utilizaremos este servicio para trabajar en equipo, enviar informes y  mantener la comunicación para alcanzar las metas en común.">Español (ES)</option>
                    <option value="de" message="Werden Sie Teil unseres Teams bei Weekdone. Wir werden diesen Service nutzen, um unsere Zusammenarbeit und Kommunikation innerhalb des Teams zu stärken und um sicherzugehen, dass alle auf dem aktuellen Stand sind.">Deutsch (DE)</option>
                    <option value="pt" message="Junte-se a mim e à nossa equipa no Weekdone! De agora em diante, usaremos isso para atualizações de status de alto nível e configuração de metas para manter todos na mesma página. Aproveite!">Português (PT)</option>
                    <option value="br" message="Junte-se a mim e à nossa equipa no Weekdone! De agora em diante, usaremos isso para atualizações de status de alto nível e configuração de metas para manter todos na mesma página. Aproveite!">Português (PT-BR)</option>
                    <option value="zh" message="在Weekdone 加入我和我们的团队！ 从现在开始，我们将使用它进行高级状态更新和目标设定，以使每个人都进度相同。 好好享受！">简体中文 (ZH)</option>
                    <option value="vi" message="Tham gia cùng tôi và nhóm của chúng tôi trên Weekdone! Từ giờ trở đi, chúng tôi sẽ sử dụng điều này cho các cập nhật trạng thái cấp cao và cài đặt mục tiêu để giữ mọi người trong cùng một tiến độ. Hãy cùng tận hưởng!">tiếng Việt (VI)</option>
                    </select>
                </div>
              </div>
              <div className='row d-flex justify-content-center my-4'>
              <button type="submit" className="btn btn-primary rounded-1" style={{maxWidth: '10%', boxShadow: 'none'}}>Invite</button>
              <button type="button" className="btn btn-link mx-2 dashboard-modal-button-cancel" data-bs-dismiss="modal" style={{maxWidth: '10%'}}>Cancel</button>
              </div>
            </form>
  )
}

