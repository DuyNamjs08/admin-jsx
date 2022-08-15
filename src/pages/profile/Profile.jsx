import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

function Profile(props) {
  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div style={{ marginTop: 60 }}>
          <div className="profileContent">
            <div className="title">
              <h3>Hồ Sơ Của Tôi</h3>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <div className="profileContentLayout">
              <form className="formProfile">
                <div className="item">
                  <span>Tên Đăng Nhập</span>
                  <span>wintergirlstore.official</span>
                </div>
                <div className="item">
                  <label>Name</label>
                  <input />
                </div>
                <div className="item">
                  <span>Email</span>
                  <span>wi*************@gmail.com</span>
                </div>
                <div className="item">
                  <span>Telephone</span>
                  <span>*********57</span>
                </div>
                <div className="item">
                  <label>Name Shop</label>
                  <input />
                </div>
                <div className="item">
                  <label>Gender</label>
                  <form>
                    <input name="gender" type="radio" value="Nam" />
                    Nam
                    <input name="gender" type="radio" value="Nữ" />
                    Nữ
                    <input name="gender" type="radio" value="Khác" />
                    Khác
                  </form>
                </div>
                <div className="item">
                  <span>Born</span>
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </div>
              </form>
              <div className="imgProfile">
                <img src="https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png" alt="" />
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
