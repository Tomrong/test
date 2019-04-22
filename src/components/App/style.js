import styled from 'styled-components'

const Main = styled.div`
position:relative;
margin:3rem auto;
table{ 
    margin:1rem auto;
    td{
        text-align:center;
    }
}
input[type=checkbox] {
    transform: scale(1.5);
  }
.table-responsive{
    padding-top:3rem;
}
.left{
    position: absolute;
    left: 0;
}
.right{
    position: absolute;
    right: 0;
}
`

export default Main