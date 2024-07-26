document.getElementById('cameraButton').addEventListener('click', setupCamera);
document.getElementById('micButton').addEventListener('click', setupMic);

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

function playAudio() {
    const video = document.getElementById('audioPlayback');
    video.play().catch(error => {
        console.error('오디오 재생에 실패했습니다:', error);
    });
}

playAudio();
