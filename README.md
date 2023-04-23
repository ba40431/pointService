# pointService

### 在本機開啟方式

1. 在 config/env 底下建立 local.env 的環境變數

```
    MYSQL_WRITE_USERNAME=
    MYSQL_WRITE_PASSWORD=
    MYSQL_WRITE_HOSTNAME=
    MYSQL_READ_USERNAME=
    MYSQL_READ_PASSWORD=
    MYSQL_READ_HOSTNAME=
```

2. 打以下指令讓專案可以正常在本機跑起來

```
    npm install
    npm start
```


### 給點 API
POST /point/:userId

payload:
```
{
	"pointId": 2,
	"amount": 1
}

```
![1682249155883.jpg](https://github.com/ba40431/Taipei-day-trip-website/blob/main/static/pic/demopic/1682249155883.jpg?raw=true)
### 用點 API
PUT /point/:userId

payload:
```
{
	"pointOffset":25
}
```
![1682249128120.jpg](https://github.com/ba40431/Taipei-day-trip-website/blob/main/static/pic/demopic/1682249128120.jpg?raw=true)