document.getElementById('cameraButton').addEventListener('click', handleCameraPermission);
document.getElementById('micButton').addEventListener('click', handleMicPermission);
document.getElementById('notificationToggle').addEventListener('change', handleNotificationPermission);

function handleCameraPermission() {
    navigator.permissions.query({ name: 'camera' }).then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
            setupCamera();
        } else if (permissionStatus.state === 'denied') {
            showPermissionDenied('카메라');
        } else {
            requestCameraPermission();
        }
    });
}

function handleMicPermission() {
    navigator.permissions.query({ name: 'microphone' }).then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
            setupMic();
        } else if (permissionStatus.state === 'denied') {
            showPermissionDenied('마이크');
        } else {
            requestMicPermission();
        }
    });
}

function setupCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.getElementById('cameraFeed');
            video.srcObject = stream;
            video.play().catch(error => {
                console.error('비디오 재생에 실패했습니다:', error);
            });
        })
        .catch(error => {
            console.error('카메라 권한이 거부되었거나 오류가 발생했습니다:', error);
        });
}

function setupMic() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audio = document.getElementById('micFeedback');
            audio.srcObject = stream;
            audio.play().catch(error => {
                console.error('마이크 피드백 재생에 실패했습니다:', error);
            });
        })
        .catch(error => {
            console.error('마이크 권한이 거부되었거나 오류가 발생했습니다:', error);
        });
}

function showPermissionDenied(device) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerText = `${device} 권한이 차단되었습니다.`;
}

function requestCameraPermission() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            stream.getTracks().forEach(track => track.stop());
            setupCamera();
        })
        .catch(error => {
            showPermissionDenied('카메라');
        });
}

function requestMicPermission() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            stream.getTracks().forEach(track => track.stop());
            setupMic();
        })
        .catch(error => {
            showPermissionDenied('마이크');
        });
}

function handleNotificationPermission() {
    if (Notification.permission === 'granted') {
        showNotificationSuccess();
    } else if (Notification.permission === 'denied') {
        showPermissionDenied('알림');
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotificationSuccess();
            } else {
                showPermissionDenied('알림');
            }
        });
    }
}

function showNotificationSuccess() {
    const toast = document.getElementById('toast');
    const notificationToggle = document.getElementById('notificationToggle');
    notificationToggle.checked = true;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    // 알림 권한 상태를 초기화
    if (Notification.permission === 'granted') {
        document.getElementById('notificationToggle').checked = true;
    }
});
