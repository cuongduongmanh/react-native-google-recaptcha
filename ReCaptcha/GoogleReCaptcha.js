import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

const patchPostMessageJsCode = `(${ String(() => {
    const originalPostMessage = window.ReactNativeWebView.postMessage;
    const patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    window.ReactNativeWebView.postMessage = patchedPostMessage;
}) })();`;

const GoogleReCaptcha = ({
                             onMessage,
                             siteKey,
                             style,
                             url,
                             languageCode,
                             cancelButtonText = 'Cancel'
                         }) => {
    const generateTheWebViewContent = (_siteKey) => {
        const originalForm =			`<!DOCTYPE html>
			<html>
			<head> 
				<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge"> 
				<script src="https://recaptcha.google.com/recaptcha/api.js?explicit&hl=${ languageCode || 'en' }"></script> 
				<script type="text/javascript"> 
				var onloadCallback = function() { 
					grecaptcha.render('cancel', {
						'sitekey' : '${ _siteKey }',
						'callback' : onCancel
					});
				};  
				var onDataCallback = function(response) { 
					window.ReactNativeWebView.postMessage(response);  
					setTimeout(function () {
						document.getElementById('captcha').style.display = 'none';
					}, 1500);
				};  
				var onCancel = function() {  
					window.ReactNativeWebView.postMessage("cancel"); 
					document.getElementById('captcha').style.display = 'none';
				}
				var onDataExpiredCallback = function(error) {  window.ReactNativeWebView.postMessage("expired"); };  
				var onDataErrorCallback = function(error) {  window.ReactNativeWebView.postMessage("error"); } 
				</script> 
				<style>
					.btn {
						background-color: #1d74f5; 
						color: #ffffff; padding: 8px 32px; margin-top: 8px; 
						border: none; border-radius: 25px; font-weight: bold;
					}
					.btn:active {
						outline: none;
					}
					.btn:focus {
						outline: none;
					}
				</style>
			</head>
			<body> 
				<div id="captcha">
					<div style="text-align: center; padding-top: 100px;">
					<div class="g-recaptcha" style="display: inline-block; height: auto;" 
						data-sitekey="${ _siteKey }" data-callback="onDataCallback"  
						data-expired-callback="onDataExpiredCallback"  
						data-error-callback="onDataErrorCallback">
					</div>
					<!--
					<div>
						<button 
							onclick="onCancel()"
							class="btn" type="button">
							${ cancelButtonText }
						</button> 
					</div>
					-->
					</div>
				</div>
			</body>
			</html>`;
        return originalForm;
    };
    return (
        <WebView
            originWhitelist={['*']}
            mixedContentMode='always'
            onMessage={onMessage}
            javaScriptEnabled
            injectedJavaScript={patchPostMessageJsCode}
            automaticallyAdjustContentInsets
            style={[{ backgroundColor: 'transparent', width: '100%' }, style]}
            source={{
                html: generateTheWebViewContent(siteKey),
                baseUrl: `${ url }`
            }}
        />
    );
};

GoogleReCaptcha.propTypes = {
    siteKey: PropTypes.string.isRequired,
    url: PropTypes.string,
    onMessage: PropTypes.func,
    languageCode: PropTypes.string,
    cancelButtonText: PropTypes.string,
    style: PropTypes.any
};

export default GoogleReCaptcha;
