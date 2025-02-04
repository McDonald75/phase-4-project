import "../assets/style/dashboard.css";
import { useEffect, useState } from "react";
import Nav from "./nav";
import Footer from "./footer";
import { useNavigate } from "react-router";
import useGetApi from "../hooks/getapi";
import appConfig from "../config";
import usePostApi from "../hooks/postapi";
import { useGiraf } from "../context";
import usePushMessage from "../hooks/pushmessage";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import uerDeleteApi from "../hooks/delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import usePatchApi from "../hooks/patch";
import axios from "axios";
const Dashboard = () => {
  const [testArray, setTestArray] = useState("testarray");
  const [products, setProducts] = useState([]);
  const { gHead, addGHead } = useGiraf();
  const { pushMessage } = usePushMessage();
  const navigate = useNavigate();
  const { actionRequest } = usePostApi();
  const { actionRequest: getActionRequest } = useGetApi();
  const { actionRequest: deleteActionRequest } = uerDeleteApi();
  const { actionRequest: patchActionApi } = usePatchApi();
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    addGHead("loading", true);
    if (gHead.user.role == "BUYER") {
      actionRequest({ endPoint: `${appConfig.api.API_URL}products/all` })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
          pushMessage(err.message, "error");

          push;
        })
        .finally(() => {
          addGHead("loading", false);
        });
    } else {
      getActionRequest({
        endPoint: `${appConfig.api.API_URL}products/farmer/${gHead.user.id}`,
      })
        .then((res) => {
          console.log(res);
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
          pushMessage(err.message, "error");
        })
        .finally(() => {
          addGHead("loading", false);
        });
    }
    return setRefresh(false)
  }, [refresh]);

  const deleteProduct = (id) => {
    deleteActionRequest({
      endPoint: `${appConfig.api.API_URL}products/delete/${id}`,
    })
      .then((res) => {
        console.log(res);
        pushMessage(res.message, "success");
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        pushMessage(err.message, "error");
      })
      .finally(() => {
        addGHead("loading", false);
        navigate("/");
      });
  };
  const patchProductName = (id, name) => {
    usePatchApi(
      {
        endPoint: `${appConfig.api.API_URL}products/name`,
      },
      { id, name }
    )
      .then((res) => {
        console.log(res);
        pushMessage(res.message, "success");
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        pushMessage(err.message, "error");
      })
      .finally(() => {
        addGHead("loading", false);
        navigate("/");
      });
  };

  return (
    <div className="dashboard">
      <Nav />
      <div className="mid"></div>
      <div className="banner">
        <div className="rectangle"></div>
        <div className="quote">Nature's Cleansing Secret.</div>
        <div className="image"></div>
      </div>
      <div className="header">
        <h1>Our Proucts</h1>
        <div className="divider"></div>
        <p>
          Find all our farm produce with amazing products, with many variations
        </p>
      </div>
      <div className="lister">
        {products?.map((l) => {
          return (
            <div key={l.id} className="listerBox">
              <div
                className="listerBox"
                style={{
                  margin: "0",
                  border: "1px solid gray",
                  marginBottom: "10px",
                }}
              >
                <div
                  className="listerImage"
                  onClick={() => {
                    addGHead("selected", l);
                    navigate("/page");
                  }}
                ></div>
                {gHead.user.role == "FARMER" ? (
                  <input
                    className="listerTitle"
                    placeholder={l.name}
                    onChange={(e) => {
                      l.name = e.target.value;
                    }}
                    style={{
                      fontWeight: "700",
                      border: "none",
                      width: "fit-content",
                      fontSize: "15px",
                      padding: "0px",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <h5
                    className="listerTitle"
                    onClick={() => {
                      addGHead("selected", l);
                      navigate("/page");
                    }}
                  >
                    {l.name}
                  </h5>
                )}

                <h5
                  className="listerPrice"
                  onClick={() => {
                    addGHead("selected", l);
                    navigate("/page");
                  }}
                >
                  Ksh {l.price_per_unit}
                </h5>
              </div>
              {gHead.user.role == "FARMER" && (
                <div className="edit_holders">
                  <BorderColorIcon
                    className="icon"
                    onClick={() => {
                      addGHead('loading', true)
                      axios.post(`${appConfig.api.API_URL}products/name`, {
                        id:l.id,
                        name:l.name
                      })
                        .then((res) => {
                          // setRefresh(true)
                          pushMessage(res.data.message, 'success')

                        })
                        .catch((err) => {
                          pushMessage(err.message, 'error')
                        })
                        .finally(() => {
                          addGHead('loading', false)
                        });
                    }}
                  />
                  <EditNoteIcon
                    className="icon"
                    onClick={() => {
                      addGHead('editFocus', l)
                      navigate('/update')
                    }}
                  />
                  <DeleteOutlineIcon
                    className="icon"
                    onClick={() => {
                      deleteProduct(l.id);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
