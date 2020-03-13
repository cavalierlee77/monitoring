import Mock from 'mockjs'
Mock.setup({
	timeout: '200 - 400'
})

const vCode = '123456'

function getVerificatCode(prarms) {
	const prarmsObj = JSON.parse(prarms.body)
	return Object.assign(prarmsObj, { vCode: vCode })
}

function loginFunc(prarms) {
	const prarmsObj = JSON.parse(prarms.body)
	if (prarmsObj.code === vCode) {
		return { code: 1, text: '登录成功' }
	} else {
		return { code: 2, text: '登录失败' }
	}
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/getVerificatCode', 'post', getVerificatCode)
Mock.mock('/login', 'post', loginFunc)
