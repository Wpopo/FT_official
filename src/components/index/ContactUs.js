import React, { Component } from 'react';
import Helper from 'Lib/helper';
import CONSTANTS from '../constants';
import Loading from 'Common/Loading';

class ContactUs extends Component {
  constructor() {
    super();

    this.offices = CONSTANTS.offices;
    this.state = {
      categoryValue: '',
      nameValue: '',
      emailValue: '',
      phoneValue: '',
      contentValue: '',
      isValidMail: false,
      sendMailResult: [],
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.checkInfo = this.checkInfo.bind(this);
  }

  handleChange(inputName, e) {
    this.setState({ [`${inputName}Value`]: e.target.value });
  }

  handleEmailChange(inputName, e) {
    this.handleChange(inputName, e);
    this.setState({ isValidMail: false });
  }

  checkInfo() {
    let result = true;
    const {
      categoryValue,
      nameValue,
      emailValue,
      phoneValue,
      contentValue
    } = this.state;

    // 檢查email
    if (!Helper.data.validateEmail(emailValue)) {
      result = false;
      this.setState({ isValidMail: true });
    }

    if (result)
      this.SendMail({
        category: categoryValue,
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        content: contentValue.replace(/(?:\r\n|\r|\n)/g, '<br />')
      });
  }

  SendMail(jsonData) {
    this.setState({ isLoading: true });

    Helper.fetch.fetchUsePostWithJson(
      CONSTANTS.API.SendMail,
      cb => {
        this.setState({ sendMailResult: cb, isLoading: false });
      },
      jsonData
    );
  }

  render() {
    const {
      isValidMail,
      isLoading,
      sendMailResult,
      categoryValue,
      nameValue,
      emailValue,
      phoneValue,
      contentValue
    } = this.state;

    return (
      <div>
        <Loading show={isLoading} />
        <div className='subTitle'>
          需要與我們聯繫或需要更多資訊？請輸入您的聯絡資料：
        </div>
        <div>
          <div className='col-lg-4 col-sm-6'>
            <select
              className='form-control'
              value={categoryValue}
              onChange={e => this.handleChange('category', e)}
            >
              <option value='' disabled selected>
                諮詢業務
              </option>
              {this.offices.map(item => (
                <option value={item.email}>{item.office}</option>
              ))}
            </select>
            <input
              type='text'
              className='form-control'
              placeholder='姓名'
              value={nameValue}
              onChange={e => this.handleChange('name', e)}
            />
            <input
              type='text'
              className={`form-control form-control${
                isValidMail ? '-valid' : ''
              }`}
              placeholder='聯絡信箱'
              value={emailValue}
              onChange={e => this.handleEmailChange('email', e)}
            />

            {isValidMail ? (
              <div class='valid-feedback'>email信箱格式輸入錯誤</div>
            ) : null}
            <input
              type='text'
              className='form-control'
              placeholder='連絡電話(選填)'
              value={phoneValue}
              onChange={e => this.handleChange('phone', e)}
            />
          </div>
          <div className='col-lg-8 col-sm-6'>
            <textarea
              class='form-control multiple-text'
              placeholder='請輸入內容'
              required
              value={contentValue}
              onChange={e => this.handleChange('content', e)}
            />
            <button
              type='submit'
              class='btn btn-control'
              onClick={this.checkInfo}
            >
              確認送出
            </button>
          </div>
        </div>
        <Result result={sendMailResult.Result} />
      </div>
    );
  }
}

const Result = ({ result = '' }) => {
  if (result === 'OK') {
    return (
      <div
        className='col-sm-12 alert alert-success'
        role='alert'
        dangerouslySetInnerHTML={Helper.data.createMarkup(
          CONSTANTS.SendMailResult.Success
        )}
      />
    );
  }
  if (result === 'FAIL') {
    return (
      <div
        className='col-sm-12 alert alert-danger'
        role='alert'
        dangerouslySetInnerHTML={Helper.data.createMarkup(
          CONSTANTS.SendMailResult.Fail
        )}
      />
    );
  }
  if (result === '') {
    return null;
  }
};
export default ContactUs;
