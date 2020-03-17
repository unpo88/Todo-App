## Requirements
>
> ### Back-end
> 
> - [Python](https://www.python.org/) : 주 개발 언어
>     - 기타 종속 환경
>         - [Pipenv](http://pipenv.org/) : Python 가상 환경 및 패키지 통합 관리 도구
> - [Django](https://www.djangoproject.com/) : Python 기반의 웹 개발 프레임워크
> - [Django REST Framework (DRF)](https://www.django-rest-framework.org/) : Django 기반의 RESTful API 개발 프레임워크
> 
> ### Front-end
> 
> - [Javascript (ES6)](https://developer.mozilla.org/ko/docs/Web/JavaScript) : 주 개발 언어
>     - 기타 종속 환경
>         - [Webpack](https://webpack.js.org/) : Javascript 모듈 번들러
>         - [Babel](https://babeljs.io/) : ES6, JSX 등을 지원하기 위한 Javascript 컴파일러
> - [React](https://reactjs.org/) : 페이스북에서 개발한 UI 개발 라이브러리
> - [React-Redux](https://react-redux.js.org/) : React에 연동되는 state 컨테이너 라이브러리
> 
> ### Environment
> 
> - [Docker](https://www.docker.com/) : 컨테이너 플랫폼

### Backend End-points

> **Resource modeling**
> 
> - 일과(Todo) 리소스 관련 API
> 
>   |  HTTP |  Path |  Method |  Permission |  목적 |
>   | --- | --- | --- | --- | --- |
>   |**GET** |/todo|LIST| Access Token |모든 Todo 조회|
>   |**POST** |/todo|CREATE| Access Token |하나의 Todo 생성|
>   |**GET** |/todo/todo_id|READ| Access Token |하나의 Todo 조회|
>   |**PUT** |/todo/todo_id|UPDATE| Access Token |하나의 Todo 수정|
>   |**DELETE** |/todo/todo_id|DELETE| Access Token |하나의 Todo 삭제|
> 
>

### Running with Docker
> **Build & Run App**
> ```sh
>     docker-compose -f docker-compose.yml up --build
> ```
> **Access the WEB at http://localhost:80**
> 
> **Access the API at http://localhost:8000**
