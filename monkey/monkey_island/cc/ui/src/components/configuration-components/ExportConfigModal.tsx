import {Button, Modal, Form} from 'react-bootstrap';
import React, {useState} from 'react';

import AuthComponent from '../AuthComponent';
import '../../styles/components/configuration-components/ExportConfigModal.scss';


type Props = {
  show: boolean,
  onClick: () => void
}

const ConfigExportModal = (props: Props) => {
  // TODO implement the back end
  const configExportEndpoint = '/api/configuration/export';

  const [pass, setPass] = useState('');
  const [radioValue, setRadioValue] = useState('password');
  const authComponent = new AuthComponent({});

  function isExportBtnDisabled() {
    return pass === '' && radioValue === 'password';
  }

  function onSubmit() {
    authComponent.authFetch(configExportEndpoint,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          should_encrypt: (radioValue === 'password'),
          password: pass
        })
      }
    )
  }

  return (
    <Modal show={props.show}
           onHide={props.onClick}
           size={'lg'}
           className={'config-export-modal'}>
      <Modal.Header closeButton>
        <Modal.Title>Configuration export</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div key={'config-export-option'}
             className={`mb-3 export-type-radio-buttons`}>
          <Form>
            <Form.Check
              type={'radio'}
              className={'password-radio-button'}
              label={<PasswordInput onChange={setPass}/>}
              name={'export-choice'}
              value={'password'}
              onChange={evt => {
                setRadioValue(evt.target.value)
              }}
              checked={radioValue === 'password'}
            />
            <ExportPlaintextChoiceField onChange={setRadioValue}
                                        radioValue={radioValue}/>
          </Form>

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'info'}
                onClick={onSubmit}
                disabled={isExportBtnDisabled()}>
          Export
        </Button>
      </Modal.Footer>
    </Modal>)
}

const PasswordInput = (props: {
  onChange: (passValue) => void
}) => {
  return (
    <div className={'config-export-password-input'}>
      <p>Encrypt with a password:</p>
      <Form.Control type='password'
                    placeholder='Password'
                    onChange={evt => (props.onChange(evt.target.value))}/>
    </div>
  )
}

const ExportPlaintextChoiceField = (props: {
  radioValue: string,
  onChange: (radioValue) => void
}) => {
  return (
    <div className={'config-export-plaintext'}>
      <Form.Check
        type={'radio'}
        label={'Skip encryption (export as plaintext)'}
        name={'export-choice'}
        value={'plaintext'}
        checked={props.radioValue === 'plaintext'}
        onChange={evt => {
          props.onChange(evt.target.value);
        }}
      />
      <p className={`export-warning text-secondary`}>
        Configuration may contain stolen credentials or sensitive data.<br/>
        It is advised to use password encryption.
      </p>
    </div>
  )
}


export default ConfigExportModal;