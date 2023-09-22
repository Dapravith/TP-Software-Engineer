import React, {useState, useEffect} from "react";
import axios from "axios";
import BranchOwnerProfile from "./BranchOwnerProfile";
import { useNavigate } from "react-router-dom";
import RightTopAlert from "./RightTopAlert";
import "../styles/branch-owner-dashboard/branch-owner-dashboard.css";
import invoiceSample from "../dss-invoice.pdf";
import ItemQRCode from "./ItemQRCode";
const style = "#ff6c37";

function BranchOwnerDashboard() {
    const [changes, setChanges] = useState(false);
    const [profile, setProfile] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postal, setPostal] = useState("");
    const [description, setDescription] = useState("");
    const [getProfile, setGetProfile] = useState("");

    const [startDestination, setStartDestination] = useState("");
    
    const [getError, setGetError] = useState(false);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND}/branch-owner/profile`, {
            token: localStorage.getItem("token")
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "Invalid Request!") setGetError(true);
            setProfile(data.data._id);
            setUsername(data.data.username);
            setGender(data.data.gender);
            setPhone(data.data.phoneNumber);
            setEmail(data.data.email);
            setAddress(data.data.address);
            setCity(data.data.city);
            setState(data.data.state);
            setPostal(data.data.postalCode);
            setDescription(data.data.description);
            setStartDestination(data.data._id)
            setGetProfile(data.data.profile);
        })
    }, [username, changes]);
    const [edit, setEdit] = useState(false);
    const [setting, setSetting] = useState(false);
    const redirect = useNavigate();
    useEffect(() => {
        const TOKEN = localStorage.getItem("token");
        if (!TOKEN || TOKEN === "undefined" || getError === true) {
            redirect("/");
        }
    }, [getError]);
    const [showMenu, setShowMenu] = useState(false);
    const handleAdminLogout = () => {
        window.localStorage.removeItem("token");
        redirect("/");
    }
    const [buttons, setButtons] = useState(["Dashboard", "Incoming Items", "Manage Items", "Delivered Items", "Items History"]);
    const [tab, setTab] = useState(0);

    // const items = [
    //     {
    //         id: 1,
    //         itemName: "Mistery Box",
    //         code: "sdfi87s9d8f7",
    //         date: "23/32/12 8:30",
    //         destination: "Battambang -> Phnom Penh",
    //         cost: "15",
    //         status: false,
    //         image: "https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg"
    //     },
    //     {
    //         id: 2,
    //         itemName: "Mistery Box",
    //         code: "sdfi87s9d8f7",
    //         date: "23/32/12 8:30",
    //         destination: "Battambang -> Phnom Penh",
    //         cost: "15",
    //         status: false,
    //         image: "https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg"
    //     },
    //     {
    //         id: 3,
    //         itemName: "Data Infos",
    //         code: "sdfi87s9d8f7",
    //         date: "23/32/12 8:30",
    //         destination: "Battambang -> Phnom Penh",
    //         cost: "15",
    //         status: true,
    //         image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
    //     },
    // ]
    // function UserUploadForm() {
    //     const [name, setName] = useState('');
    //     const [selectedFile, setSelectedFile] = useState(null);
      
    //     const handleNameChange = (event) => {
    //       setName(event.target.value);
    //     };
      
    //     const handleFileChange = (event) => {
    //       setSelectedFile(event.target.files[0]);
    //     };
      
    //     const handleSubmit = async (event) => {
    //       event.preventDefault();
      
    //       try {
    //         const formData = new FormData();
    //         formData.append('image', selectedFile);
    //         formData.append('finalBranchId', "64dc4f30ac94a445c6b9878a");
    //         formData.append('initializeBranchId', "64dc9362981d92765e9245df");
    //         formData.append('itemName', "Hello");
    //         formData.append('description', "Hello");
    //         formData.append('weight', "Hello");
    //         formData.append('cost', "Hello");
      
    //         await axios.post(`${process.env.REACT_APP_BACKEND}/branch-owner/items`, formData).then(data => {
    //             console.log(data)
    //         }).catch(err => console.log(err));
      
    //         // Reset form after successful upload
    //         setName('');
    //         setSelectedFile(null);
      
    //         alert('User data uploaded successfully');
    //       } catch (error) {
    //         // console.error(error);
    //         alert('Error uploading user data');
    //       }
    //     };
      
    //     return (
    //       <div>
    //         <form onSubmit={handleSubmit}>
    //           <input type="file" onChange={handleFileChange} />
    //           <button type="submit">Upload</button>
    //         </form>
    //       </div>
    //     );
    //   }
    

    // const [allDestination, setAllDestination] = useState([]);
    // function getCityStart(itemName) {
    //     // return id;
    //     axios.get(`${process.env.REACT_APP_BACKEND}/start`, {itemName: itemName}).then(data => {
    //         // return JSON.stringify(data)
    //         console.log(data);
    //         return data.data.city;
    //     }).catch(err => {
    //         // return err;
    //     })
    // }
    // useEffect(() => {
    //     getCityStart("64dc4f30ac94a445c6b9878a")
    // }, [])
    // // const getCityEnd = (id) => {
    // //     axios.get(`${process.env.REACT_APP_BACKEND}/item/destination/end`, {
    // //         _id: id,
    // //     }).then(data => {
    // //         return data;
    // //     }).catch(err => {
    // //         return err;
    // //     })
    // // }
    const [items, setItems] = useState([]);
    const [allBranchOwners, setAllBranchOwners] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/branch-owner/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setAllBranchOwners(data.data);
        }).catch(err => {
            return err;
        })
    }, []);

    const [allDestinations, setAllDestinations] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/branch-owner/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setAllDestinations(data.data);
        }).catch(err => {
            return err;
        })
    }, []);
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputFileValue, setInputFileValue] = useState("");
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setInputFileValue(e.target.files[0].name);
    };

    useEffect(() => {
        setSelectedFile(null);
    }, [items])
    const [showAddItem, setShowAddItem] = useState(false);

    const [packageName, setPackageName] = useState("");
    const [itemWeight, setItemWeight] = useState("");
    const [itemCost, setItemCost] = useState("");
    const [itemPhoneNumber, setItemPhoneNumber] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemReceiver, setItemReceiver] = useState("");
    // useEffect(() => {
    //     setItemDestination(allBranchOwners.length > 0 && allBranchOwners[0].city)
    // }, [])
    useEffect(() => {
        itemWeight.length > 0 && setItemCost(itemWeight * 1.5);
        if (itemWeight.length === 0) {
            setItemCost("")
        }
    }, [itemWeight]);
    const [endDestination, setEndDestination] = useState("");

    const destinations = allDestinations.filter(des => des.city !== city).map(data => data.city);
    const [destinationChoice, setDestinationChoice] = useState(0);

    useEffect(() => {
        allBranchOwners.map(data => {
            if (data.city === destinations[destinationChoice]) {
                setEndDestination(data._id);
            }
        })
    }, [destinationChoice, showAddItem]);

    const [addedItem, setAddedItem] = useState(false);
    const [isNotImageAdded, setIsNotImageAdded] = useState(false);

    const getPackageCode = () => {
        if (items.length === 0) {
            return "00001"
        }
        const lastItem = items.length - 1;
        const getLastPackageCode = Number(items[lastItem].packageCode);
        const currentPackageCode = (getLastPackageCode + 1).toString();
        if (currentPackageCode.length === 1) {
            return `0000${currentPackageCode}`
        } else if (currentPackageCode.length === 2) {
            return `000${currentPackageCode}`
        } else if (currentPackageCode.length === 3) {
            return `00${currentPackageCode}`
        } else if (currentPackageCode.length === 4) {
            return `0${currentPackageCode}`
        } else {
            return currentPackageCode;
        }
    }
    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('packageCode', getPackageCode())
            formData.append('image', selectedFile);
            formData.append('initializeBranchId', startDestination);
            formData.append('middleBranchId', "[]");
            formData.append('finalBranchId', endDestination);
            formData.append('packageName', packageName);
            formData.append("phoneNumber", itemPhoneNumber)
            formData.append("receiver", itemReceiver)
            formData.append('description', itemDescription);
            formData.append('weight', itemWeight);
            formData.append('cost', itemCost);
            formData.append("status", "pending");
            await axios.post(`${process.env.REACT_APP_BACKEND}/branch-owner/items`, formData).then(data => {
                console.log(data);
                if (data.data.message === "SUCCESS") {
                    setShowAddItem(false);
                    setAddedItem(true);
                    
                    setPackageName("");
                    setItemReceiver("");
                    setItemDescription("");
                    setItemWeight("");
                    setItemCost("");
                    setItemPhoneNumber("");
                    setSelectedFile(null);
                    setInputFileValue("");
                }
                // setSelectedFile(null);
            }).catch(err => err);
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    

    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");

    const [updated, setUpdated] = useState(false);

    const [isDeleted, setIsDeleted] = useState(false);
    const handleDeleteItem = (id) => {
        // axios.delete(`${process.env.REACT_APP_BACKEND}/images/${items.map(item => item._id === id && item.image)}`)
        const getFileImage = items.length > 0 && items.filter(data => {
            return data._id === id;
        })[0].image.slice(8);
        axios.delete(`${process.env.REACT_APP_BACKEND}/images/${getFileImage}`);
        axios.delete(`${process.env.REACT_APP_BACKEND}/branch-owner/items/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        },{_id: startDestination}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            console.log(data);
            if (data.data.message === "Item Removed!") {
                setShowAlertDelete(false);
                setIsDeleted(true);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    
    const [showDetail, setShowDetail] = useState(false);
    const [itemDetail, setItemDetail] = useState([]);
    const showItemDetail = (id) => {
        setShowDetail(true);
        items.map(data => {
            return data._id === id ? setItemDetail(data) : null;
        });
    }

    const [getIdEdit, setGetIdEdit] = useState("");
    const editItemInformation = (e) => {
        e.preventDefault();
        const getFileImage = items.length > 0 && items.filter(data => {
            return data._id === getIdEdit;
        })[0].image.slice(8);
        axios.delete(`${process.env.REACT_APP_BACKEND}/images/${getFileImage}`);
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('initializeBranchId', startDestination);
        formData.append('middleBranchId', "[]");
        formData.append('finalBranchId', endDestination);
        formData.append('itemName', packageName);
        formData.append('phoneNumber', itemPhoneNumber);
        formData.append('receiver', itemReceiver);
        formData.append('description', itemDescription);
        formData.append('weight', itemWeight);
        formData.append('cost', itemCost);
        formData.append("status", "pending");
        axios.put(`${process.env.REACT_APP_BACKEND}/branch-owner/items/update/${getIdEdit}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "UPDATED SUCCESS") {
                setUpdated(true);
                setShowAddItem(false);
            }
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    };
    const [branchOwnerContent, setBranchOwnerContent] = useState(["Total Items Pending", "Total Items Incoming", "Total Delivered Items", "Total Profit"]);
    const [itemsDelivered, setItemsDelivered] = useState(false);
    // const getItemsId = items.filter(data => data.initializeBranchId === profile).map(data => data._id);

    const [showInvoice, setShowInvoice] = useState(false);
    const [displayInvoice, setDisplayInvoice] = useState([]);
    const getInvoiceByPhoneNumber = (phone) => {
        setShowInvoice(true);
        setDisplayInvoice(filteredBranchItems.filter(data => {
            return data.phoneNumber === phone;
        }))
    }

    useEffect(() => {
        setTimeout(() => {
            setAddedItem(false);
            setIsDeleted(false);
            setUpdated(false);
            setItemsDelivered(false);
        }, 3000)
    }, [addedItem, isDeleted, updated, itemsDelivered]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/branch-owner/items`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setItems(data.data);
            if (updated) {
                setItems(data.data);
            }
        }).catch(err => {
            return err;
        })
    }, [showAlertDelete, showAddItem, updated, itemsDelivered, addedItem]);
    const [uniquePhoneNumber, setUniquePhoneNumber] = useState([]);
    const hash = {}
    useEffect(() => {
        for (let i = 0; i < filteredBranchItems.length; i++) {
            hash[filteredBranchItems[i].phoneNumber] = {phone: filteredBranchItems[i].phoneNumber, color: i % 2 === 0 ? "red" : "green"}
        }
        setUniquePhoneNumber(Object.values(hash));
    }, [items, addedItem, tab]);

    const incomingItems = items?.filter(data => {
        return data.finalBranchId === startDestination;
    })

    const [filterNumber, setFilterNumber] = useState(0);
    const [allFinalBranches, setAllFinalBranches] = useState([]);
    const allItemFinalBranches = items.filter(item => {
        return item.status === "pending" && item.initializeBranchId === startDestination;
    }).map(x => x.finalBranchId);
    const [showFilter, setShowFilter] = useState(false);
    useEffect(() => {
        let list = [];
        for (const value of allBranchOwners) {
            if (allItemFinalBranches.includes(value._id)) {
                list.push(value._id);
            }
        }
        setAllFinalBranches(list);
    }, [showFilter, tab, items]);

    useEffect(() => {
        setFilterNumber(0);
    }, [items])

    const filteredBranchItems = items.filter(item => {
        return item.initializeBranchId === startDestination;
    }).filter(x => x.finalBranchId === allFinalBranches[filterNumber]);

    const allItemsInBranch = items.filter(item => {
        return item.initializeBranchId === startDestination;
    }).filter(data => data.status === "pending")


    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    // const [username, setUsername] = useState("");
    useEffect(() => {
        const dates = new Date();
        let getDate = dates.getDate();
        // let getMonth = dates.getMonth();
        setMonth(dates.getMonth() + 1);
        let getYear = dates.getFullYear();
            if (getDate === 1 || getDate === 21 || getDate === 31) {
                setDate(getDate + "st");
            }
            else if (getDate === 2 || getDate === 22) {
                setDate(getDate + "nd");
            }
            else if (getDate === 3 || getDate === 23) {
                setDate(getDate + "rd");
            }
            else {
                setDate(getDate + "th");
            }
            // switch (getMonth) {
            //     case 0:
            //         setMonth("January");
            //         break;
            //     case 1:
            //         setMonth("February");
            //         break;
            //     case 2:
            //         setMonth("March");
            //         break;
            //     case 3:
            //         setMonth("April");
            //         break;
            //     case 4:
            //         setMonth("May");
            //         break;
            //     case 5:
            //         setMonth("June");
            //         break;
            //     case 6:
            //         setMonth("July");
            //         break;
            //     case 7:
            //         setMonth("August");
            //         break;
            //     case 8:
            //         setMonth("September");
            //         break;
            //     case 9:
            //         setMonth("October");
            //         break;
            //     case 10:
            //         setMonth("November");
            //         break;
            //     default:
            //         setMonth("December");
            //         break;
            // }
        setYear(getYear);
        setHour(dates.getHours());
        setMinute(dates.getMinutes());
        setSecond(dates.setSeconds());
    }, []);
    const getInvoicePDF = async (text) => {
        const { PDFDocument, rgb } = window.PDFLib;
        const exBytes = await fetch(invoiceSample).then(res => {
            return res.arrayBuffer();
        });
        const pdfDoc = await PDFDocument.load(exBytes);
        pdfDoc.registerFontkit(window.fontkit);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.drawText(`Item Code: ${text[0].phoneNumber}`, {
            size: 18,
            color: rgb(0,0,0),
            x: 20,
            y: 530 + 150
        })
        firstPage.drawText(`Invoice Date: ${date}/${month}/${year} ${hour >= 12 ? hour - 12 : hour}:${minute} ${hour >= 12 ? "PM" : "AM"}`, {
            size: 12,
            color: rgb(0,0,0),
            x: 20,
            y: 530 + 125
        })
        firstPage.drawText(`Destination: ${allBranchOwners.filter(data => data._id === text[0].initializeBranchId)[0].city} - ${allBranchOwners.filter(data => data._id === text[0].finalBranchId)[0].city}`, {
            size: 12,
            color: rgb(0,0,0),
            x: 20,
            y: 510 + 125
        })

        firstPage.drawText(`Sender Tel.: ${text[0].phoneNumber}`, {
            size: 12,
            color: rgb(0,0,0),
            x: 20,
            y: 490 + 125
        })

        firstPage.drawText(`Receiver Tel.: ${text[0].receiver}`, {
            size: 12,
            color: rgb(0,0,0),
            x: 20,
            y: 470 + 125,
        })

        let textToPrint = "";
        for (const value of text) {
            textToPrint += value.itemName + " - " + "$" + value.cost + "\n"
        }
        firstPage.drawText(`------------------------------------- Items List --------------------------------------\n` + textToPrint + "------------------------------------------------------------------------------------------\n" + `Total: $${text.map(data => Number(data.cost)).reduce((a, b) => a + b)}\n--------------------------------- Company Details --------------------------------\nAddress: ${allBranchOwners.filter(data => data._id === text[0].initializeBranchId)[0].address}\nTel.: ${allBranchOwners.filter(data => data._id === text[0].initializeBranchId)[0].phoneNumber}\nOwner: ${allBranchOwners.filter(data => data._id === text[0].initializeBranchId)[0].username}\nThank you for choosing us, Have a nice day!`, {
            size: 12,
            color: rgb(0,0,0),
            x: 20,
            y: 450 + 125,
        });
        // firstPage.drawText(`Company Details`, {
        //     size: 15,
        //     color: rgb(0,0,0),
        //     x: 20,
        //     y: (430 + 150) - (text.length * 35),
        // })
        // firstPage.drawText(`Address: ${allBranchOwners.filter(data => data._id === text[0].initializeBranchId)[0].address}`, {
        //     size: 12,
        //     color: rgb(0,0,0),
        //     x: 20,
        //     y: (410 + 150) - (text.length * 35),
        // })
        // firstPage.drawText(`Tel.: ${allBranchOwners.filter(data => data._id === text[0].initializeBranchId)[0].phoneNumber}`, {
        //     size: 12,
        //     color: rgb(0,0,0),
        //     x: 20,
        //     y: (390 + 150) - (text.length * 35),
        // })
        // firstPage.drawText(`-------------------------------------------------------------------------------------------`, {
        //     size: 12,
        //     color: rgb(0,0,0),
        //     x: 20,
        //     y: (370 + 150) - (text.length * 35),
        // })
        // firstPage.drawText(`Thank you for choosing us,\nHave a nice day!`, {
        //     size: 15,
        //     color: rgb(0,0,0),
        //     x: 20,
        //     y: (350 + 150) - (text.length * 35),
        // })
        const uri = await pdfDoc.saveAsBase64({ dataUri: true });
        window.open(uri, "_blank");
    }

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemsData, setSelectedItemsData] = useState([]);

    const handleSelectDelivered = (id) => {
        setSelectedItems([...selectedItems, id]);
        filteredBranchItems.map(data => {
            if (data._id === id) {
                setSelectedItemsData([...selectedItemsData, data]);
            }
        })
    }

    const handleRemoveSelectDelivered = (id) => {
        setSelectedItems(selectedItems.filter(data => {
            return data !== id;
        }))
        setSelectedItemsData(selectedItemsData.filter(data => data._id !== id));
    }

    const markAsDelivered = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/branch-owner/items/history`, {
            initializeBranchId: filteredBranchItems.length > 0 && filteredBranchItems[0].initializeBranchId,
            finalBranchId: filteredBranchItems.length > 0 && filteredBranchItems[0].initializeBranchId,
            items: filteredBranchItems.length > 0 && JSON.stringify(selectedItemsData)
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "Successfully Saved Items To History!") {
                setSelectedItems([]);
                // selectedItems.forEach(id => {
                //     axios.delete(`${process.env.REACT_APP_BACKEND}/branch-owner/items/${id}`, {
                //         headers: {
                //             Authorization: `Bearer ${localStorage.getItem("token")}`,
                //         }
                //     })
                // })
            }
        }).catch(err => err);
        selectedItems.forEach(id => {
            return axios.put(`${process.env.REACT_APP_BACKEND}/branch-owner/items/delivered/${id}`, {}, {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }}).then(data => {
                if (data.data.message === "Items Delivered!") {
                    setItemsDelivered(true);
                }
            });
        })
    }

    const [isSelectAll, setIsSelectAll] = useState(false);
    const handleSelectAllItems = () => {
        setIsSelectAll(true);
        setSelectedItems(filteredBranchItems.map(data => data._id));
    }

    const [history, setHistory] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/branch-owner/items/history`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setHistory(data.data);
        }).catch(err => err);
    }, [tab]);

    const [endingLocationsHistory, setEndingLocationsHistory] = useState([]);
    useEffect(() => {
        const getAllHistoriesFinalDest = history.length > 0 && history.map(data => JSON.parse(data.items)).map(item => item[0]?.finalBranchId);
        setEndingLocationsHistory(getAllHistoriesFinalDest);
    }, [history, tab]);

    const pendingLength = allItemsInBranch.filter(data => data.status === "pending");
    const deliveredLength = incomingItems.filter(data => data.status === "delivered");

    const calculateProfit = history.filter(hist => JSON.parse(hist.items)[0]?.initializeBranchId === profile).map(item => JSON.parse(item.items)).map(x => x.map(y => Number(y.cost))).map(arr => arr.reduce((a, b)=>a +b)).length > 0 && history.filter(hist => JSON.parse(hist.items)[0]?.initializeBranchId === profile).map(item => JSON.parse(item.items)).map(x => x.map(y => Number(y.cost))).map(arr => arr.reduce((a, b) => a +b)).reduce((a, b) => a + b);

    return (
        <div className="branch-owner-dashboard">
            {showFilter && <div className="filter-final-branch-container">
                <div className="filter-final-branch">
                    <div className="filter-final-branch-title">
                        <h1>Filter By Final Branch Owner</h1>
                    </div>
                    <div className="filter-final-branch-content">
                        {
                            allFinalBranches.map((data, index) => {
                                return (
                                    <div key={data} className="filter-final-branch-choice" onClick={() => setFilterNumber(index)}>
                                        <div className="filter-final-branch-select">
                                            <div className="filter-final-branch-dot" style={{background: filterNumber === index ? "#000" : "unset"}}>
                                            </div>
                                        </div>
                                        <p>{allBranchOwners.map(branch => branch._id === data && branch.city)}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="filter-final-branch-content-btn">
                            <button onClick={() => setShowFilter(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>}
            {showInvoice && <div className="display-invoice-container">
                <div className="display-invoice">
                    <div className="display-invoice-title">
                        <h1>Phone Number: {displayInvoice[0].phoneNumber}</h1>
                    </div>
                    <div className="display-invoice-content">
                        {
                            displayInvoice.map((data, index) => {
                                return <div className="display-invoice-content-data" key={data._id}>
                                    <p style={{display: "flex", alignItems: "center"}}>{index + 1}. {data.itemName} <img src={`${process.env.REACT_APP_BACKEND}/images/${data._id}`} style={{height: "30px", marginLeft: "10px", borderRadius: "5px"}} /></p>
                                    <p>${data.cost}</p>
                                </div>
                            })
                        }
                        <div className="display-invoice-content-total">
                            <h3>Total: </h3>
                            <p>${displayInvoice.map(data => data.cost).reduce((a, b) => Number(a) + Number(b))}</p>
                        </div>
                    </div>
                    <div className="display-invoice-btn">
                        <button onClick={() => setShowInvoice(false)}>Cancel</button>
                        <button onClick={() => getInvoicePDF(displayInvoice)}>Download As PDF</button>
                    </div>
                </div>
            </div>}
            {addedItem && <RightTopAlert content={"New Item Added Successfully!"} type={"SUCCESS"} />}
            {isDeleted && <RightTopAlert content={"An Item Deleted Successfully!"} type={"SUCCESS"} />}
            {updated && <RightTopAlert content={"An Item Updated Successfully!"} type={"SUCCESS"} />}
            {itemsDelivered && <RightTopAlert content={"All Items Delivered Successfully!"} type={"SUCCESS"} />}
            {showDetail && <div className="alert-detail-popup">
                <div className="alert-detail" id={itemDetail.status === "pending" ? "pending" : "delivered"}>
                    <div className="alert-detail-close" onClick={() => setShowDetail(false)}>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="alert-detail-image" style={
                        {
                            background: `url(${process.env.REACT_APP_BACKEND}/images/${itemDetail._id}) no-repeat`
                        }
                    }>
                    </div>
                    <div className="alert-detail-content">
                        <div className="alert-item-content">
                            <h1>{itemDetail.packageName}</h1>
                        </div>
                        <div className="alert-item-content">
                            <p><span>Item Code</span>: {itemDetail.packageCode}</p>
                        </div>
                        <div className="alert-item-content">
                            <p><span>Phone Number Sender</span>: {itemDetail.phoneNumber}</p>
                        </div>
                        <div className="alert-item-content">
                            <p><span>Phone Number Receiver</span>: {itemDetail.receiver}</p>
                        </div>
                        <div className="alert-item-content">
                            <p><span>Weight</span>: {itemDetail.weight}Kg</p>
                        </div>
                        <div className="alert-item-content">
                            <p><span>Cost</span>: ${itemDetail.cost}</p>
                        </div>
                        <div className="alert-item-content">
                            <p><span>Delivery Date</span>: {new Date(Number(itemDetail.date)).getDate()}/{new Date(Number(itemDetail.date)).getMonth()}/{new Date(Number(itemDetail.date)).getFullYear()} {new Date(Number(itemDetail.date)).getHours()}:{new Date(Number(itemDetail.date)).getMinutes()} {new Date(Number(itemDetail.date)).getHours() >= 12 ? 'PM' : 'AM'}</p>
                        </div>
                        {/* <div className="alert-item-content">
                            <p><span>Destination</span>: {allBranchOwners.map(branch => {
                                if (branch._id === itemDetail.initializeBranchId) {
                                    return branch.city
                                }
                            })} -&gt; {allBranchOwners.map(branch => {
                                if (branch._id === itemDetail.finalBranchId) {
                                    return branch.city
                                }
                            })}</p>
                        </div> */}
                        <div className="alert-item-content">
                            <p><span>Description</span>: {itemDetail.description}</p>
                        </div>
                        <div className="alert-item-content">
                            <p style={{marginBottom: "10px"}}><span>Item QR Code</span>: </p>
                            <ItemQRCode qrText={itemDetail.packageCode} />
                        </div>
                        {/* <div className="alert-item-destination">
                            <div className="left-des">
                                <div className="left-des-point">
                                    <div className="special-point"></div>
                                </div>
                                <p>{allBranchOwners.map(branch => {
                                    if (branch._id === itemDetail.initializeBranchId) {
                                        return branch.city
                                    }
                                })}</p>
                            </div>
                            <div className="line-des">

                            </div>
                            <div className="right-des">
                                <div className="right-des-point">
                                    <div className="special-point"></div>
                                </div>
                                <p>{allBranchOwners.map(branch => {
                                    if (branch._id === itemDetail.finalBranchId) {
                                        return branch.city
                                    }
                                })}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>}
            {showAlertDelete && <div className="alert-delete-popup">
                <div className="alert-delete">
                    <h1>Are you sure that you want to delete <span style={{fontWeight: "bold"}}>{items.filter(data => data._id === idToDelete)[0].packageName}</span> {tab === 3 && "from delivered items"}?</h1>
                    <div className="alert-delete-btn">
                        <button onClick={() => setShowAlertDelete(false)}>No</button>
                        <button onClick={() => handleDeleteItem(idToDelete)}>Yes</button>
                    </div>
                </div>
            </div>}
            <div className="branch-owner-dashboard-menu" style={{transform: showMenu && "translateX(0%)", transition: !showMenu && "0.1s"}}>
                <div className="branch-owner-dashboard-menu-close" onClick={() => setShowMenu(false)}>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="branch-owner-dashboard-menu-top">
                    <div className="branch-owner-dashboard-menu-logo">
                        <h1 style={{fontWeight: "400"}}>CAMBO <span style={{color: style, fontWeight: "bold"}}>EXPRESS</span></h1>
                    </div>
                    <div className="branch-owner-dashboard-menu-list">
                        {
                            buttons.map((data, index) => {
                                return <li style={{background: tab === index ? style : "", color: tab === index ? "#fff" : ""}} key={data} onClick={() => {
                                    setTab(index);
                                    setSetting(false);
                                    setShowMenu(false);
                                }}>{data}</li>
                            })
                        }
                    </div>
                </div>
                <div className="branch-owner-dashboard-menu-bottom">
                    <div className="branch-owner-logout">
                        <button onClick={handleAdminLogout}>Log Out</button>
                    </div>
                </div>
            </div>
            {showMenu && <div className="dark-panel" onClick={() => setShowMenu(false)}></div>}
            <div className="branch-owner-dashboard-header">
                <div className="branch-owner-dashboard-header-hamburger" onClick={() => setShowMenu(true)}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="location">
                    <i className="fa fa-map-marker"></i>
                    <h1>{city === "" ? "Location" : city}</h1>
                </div>
                <div className="branch-owner-dashboard-header-profile">
                    <div className="branch-owner-infos" onClick={() => {
                        setEdit(!edit);
                    }}>
                        <div className="branch-owner-profile" style={
                            {
                                width: "40px",
                                height: "40px",
                                minWidth: "40px",
                                minHeight: "40px",
                                background: `url(${process.env.REACT_APP_BACKEND}/branch-owner/profile/${profile}) no-repeat`,
                                borderRadius: "50%"
                            }
                        }>
                        </div>
                        <div className="branch-owner-name">
                            <p>{username.length === 0 ? "User" : username}</p>
                        </div>
                        <svg style={{transform: edit ? "rotate(180deg)" : ""}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 292.362 292.362"><path d="M286.935 69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952 0-9.233 1.807-12.85 5.424C1.807 72.998 0 77.279 0 82.228c0 4.948 1.807 9.229 5.424 12.847l127.907 127.907c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428L286.935 95.074c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z"></path></svg>
                    </div>
                    {edit && <div className="settings">
                        {/* <button>View Profile</button>
                        <button>Edit Profile</button> */}
                        <button onClick={() => {
                            setSetting(true);
                            setEdit(false);
                            setTab(-1);
                        }}>View Profile</button>
                    </div>}
                </div>
            </div>
            {/* <UserUploadForm/> */}
            <div className="add-item-popup" style={{display: showAddItem ? "flex" : "none"}}>
                <div className="add-item-popup-form">
                    <form onSubmit={getIdEdit.length === 0 ? handleAddItem : editItemInformation}>
                        <div className="form-title">
                            <h1>{getIdEdit.length > 0 ? "Update An Item" : "Add New Item"}</h1>
                        </div>
                        <div className="form-content">
                            <label>Item Name</label>
                            <input type="text" placeholder="Mystery Box" value={packageName} onChange={e => setPackageName(e.target.value)}  required />
                            <label>Phone Number Sender</label>
                            <input type="tel" placeholder="Phone Number Sender" value={itemPhoneNumber} onChange={e => setItemPhoneNumber(e.target.value)}  required />
                            <label>Phone Number Receiver</label>
                            <input type="tel" placeholder="Phone Number Receiver" value={itemReceiver} onChange={e => setItemReceiver(e.target.value)}  required />
                            <label>Weight (Kg)</label>
                            <input type="number" placeholder="1" value={itemWeight} onChange={e => setItemWeight(e.target.value)} required />
                            <label>Cost ($)</label>
                            <input type="number" placeholder="1.5" value={itemCost} onChange={e => setItemCost(e.target.value)} required />
                            <label>Destination</label>
                            <div className="destinations">
                                {
                                    destinations.map((data, index) => {
                                        return <div className="destination-choice" key={data} onClick={() => setDestinationChoice(index)}>
                                            <div className="choice">
                                                <div className="choice-inner" style={{background: destinationChoice === index ? "#000" : ""}}></div>
                                            </div>
                                            <p>{data}</p>
                                        </div>
                                    })
                                }
                            </div>
                            <label>Description</label>
                            <textarea value={itemDescription} onChange={e => setItemDescription(e.target.value)} placeholder="Describe about item..." required></textarea>
                            <label>Upload Image</label>
                            {inputFileValue.length > 0 && <div className="image-name">
                                <p>{inputFileValue}</p>
                            </div>}
                            {isNotImageAdded && <p>Please upload an image!</p>}
                            <input id="file-upload" type="file" onChange={handleFileChange} style={{display: "block", opacity: 0, height: 0}} accept="image/*" required />
                            <div id="browse" onClick={() => {
                                const inputFile = document.getElementById("file-upload");
                                inputFile.click();
                            }}><svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-name="Layer 3"><path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"></path><path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"></path></svg>Browse</div>
                            <div className="btn-action">
                                <button type="button" onClick={() => {
                                    setShowAddItem(false);
                                    setInputFileValue("");
                                }}>Cancel</button>
                                {getIdEdit.length > 0 ? <button type="submit" disabled={getIdEdit.length === 0}>Update</button> : <button type="submit" disabled={getIdEdit.length > 0}>Submit</button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="branch-owner-dashboard-container">
                {(!setting && tab === 0) && <div className="branch-owner-overview">
                    <div className="branch-owner-overview-title">
                        <h1>Branch Owner Dashboard</h1>
                    </div>
                    <div className="branch-owner-overview-content">
                        <div className="branch-owner-boxes">
                            {
                                branchOwnerContent.map((data, index) => {
                                    return (
                                        <div className="branch-owner-box" key={index} onClick={() => {
                                            if (index === 0) {
                                                setTab(2);
                                            } else if (index === 1) {
                                                setTab(1);
                                            } else if (index === 2) {
                                                setTab(3);
                                            } else if (index === 3) {
                                                setTab(4);
                                            }
                                        }}>
                                            {(index === 0 || index === 1 || index === 2) && <i className="fa fa-cube"></i>}
                                            {index === 3 && <i className="fa fa-dollar"></i>}
                                            <h1>{data}</h1>
                                            {index === 0 && <p>{pendingLength.length}</p>}
                                            {index === 2 && <p>{deliveredLength.length}</p>}
                                            {index === 1 && <p>{incomingItems.filter(item => item.status === "pending").length}</p>}
                                            {index === 3 && <p>${calculateProfit || 0}</p>}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>}
                {(!setting && tab === 1) && <div className="branch-owner-overview">
                    <div className="branch-owner-overview-title">
                        <h1>Incoming Items Dashboard</h1>
                    </div>
                    {/* <div className="add-item">
                        <button onClick={() => {
                            setShowAddItem(true);
                            setGetIdEdit("");
                            setItemName("");
                            setItemPhoneNumber("");
                            setItemDescription("");
                            setItemWeight("");
                            setItemCost("");
                            setSelectedFile(null);
                            setInputFileValue("");
                        }}><i className="fa fa-plus"></i>Add An Item</button>
                    </div> */}
                    {incomingItems.filter(item => item.status === "pending").length === 0 && <div className="no-item">
                        <div className="no-item-content">
                            <i className="fa fa-cube"></i>
                            <h1>No Incoming Item Found!</h1>
                        </div>
                    </div>}
                    <div className="items-manage-content">
                        {
                            incomingItems.length > 0 && incomingItems.filter(item => item.status === "pending").map((data, index) => {
                                return (
                                    <div className="items-manage-content-overview" key={data._id}>
                                        {index === 0 && <div className="items-manage-content-header">
                                            <div className="content-header">
                                                <h3>No.</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Image</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Item Name</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Delivery Date</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Destination</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Cost</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Status</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Actions</h3>
                                            </div>
                                        </div>}
                                        <div className="items-manage-content-data" style={{background: uniquePhoneNumber.indexOf(data.phoneNumber) % 2 !== 0 ? "#ffffff": "#e0e0e0"}}>
                                            <div className="content-data">
                                                <p>{index + 1}</p>
                                            </div>
                                            <div className="content-data">
                                                <div className="image" style={
                                                    {
                                                        background: `url(${process.env.REACT_APP_BACKEND}/images/${data._id}) no-repeat`
                                                    }
                                                }>
                                                </div>
                                                {/* <img src={`${process.env.REACT_APP_BACKEND}/images/${data._id}`}/> */}
                                            </div>
                                            <div className="content-data">
                                                <p>{data.itemName}</p>
                                            </div>
                                            <div className="content-data">
                                                <p>{new Date(Number(data.date)).getDate()}/{new Date(Number(data.date)).getMonth() + 1}/{new Date(Number(data.date)).getFullYear()} {new Date(Number(data.date)).getHours()}:{new Date(Number(data.date)).getMinutes()} {new Date(Number(data.date)).getHours() >= 12 ? 'PM' : 'AM'}</p>
                                            </div>
                                            <div className="content-data" id="destination">
                                                {/* <button onClick={() =>{
                                                    alert(getCityStart(data.initializeBranchId))
                                                }}>click</button> */}
                                                {/* <p>{getCityStart(data.itemName)}</p> */}
                                                <p>{allBranchOwners.map(branch => {
                                                    if (branch._id === data.initializeBranchId) {
                                                        return branch.city
                                                    }
                                                })} -&gt; {allBranchOwners.map(branch => {
                                                    if (branch._id === data.finalBranchId) {
                                                        return branch.city
                                                    }
                                                })}</p>
                                            </div>
                                            <div className="content-data">
                                                <p>${data.cost}</p>
                                            </div>
                                            <div className="content-data">
                                                <p id={data.status !== "pending" ? "status-true" : "status-false"} style={{background: data.status !== "pending" ? "" : "orange", textTransform: "uppercase"}}>{data.status !== "pending" ? "Delivered" : "Incoming"}</p>
                                            </div>
                                            <div className="content-data">
                                                <button onClick={() => showItemDetail(data._id)}><i className="fa fa-eye"></i></button>
                                                {/* <button><i className="fa fa-pencil" onClick={() => {
                                                    setShowAddItem(true);
                                                    setGetIdEdit(data._id);
                                                    setItemName(data.itemName);
                                                    setItemPhoneNumber(data.phoneNumber);
                                                    setItemWeight(data.weight);
                                                    setItemDescription(data.description);
                                                }}></i></button>
                                                <button onClick={() => {
                                                    setShowAlertDelete(true);
                                                    setIdToDelete(data._id);
                                                }}><i className="fa fa-trash"></i></button>
                                                <button onClick={() => getInvoiceByPhoneNumber(data.phoneNumber)}><i className="fa fa-file-pdf-o"></i></button> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* {filteredBranchItems.length > 0 && <div className="items-delivered">
                            <button onClick={markAsDelivered}>Mark As Delivered</button>
                        </div>} */}
                    </div>
                </div>}
                {(!setting && tab === 3) && <div className="branch-owner-overview">
                    <div className="branch-owner-overview-title">
                        <h1>Delivered Items Dashboard {deliveredLength.length > 0 && "- " + deliveredLength.length}</h1>
                    </div>
                    {/* <div className="add-item">
                        <button onClick={() => {
                            setShowAddItem(true);
                            setGetIdEdit("");
                            setItemName("");
                            setItemPhoneNumber("");
                            setItemDescription("");
                            setItemWeight("");
                            setItemCost("");
                            setSelectedFile(null);
                            setInputFileValue("");
                        }}><i className="fa fa-plus"></i>Add An Item</button>
                    </div> */}
                    {incomingItems.length === 0 && <div className="no-item">
                        <div className="no-item-content">
                            <i className="fa fa-cube"></i>
                            <h1>No Delivered Item Found!</h1>
                        </div>
                    </div>}
                    <div className="items-manage-content">
                        {
                            incomingItems.length > 0 && incomingItems.filter(item => item.status === "delivered").map((data, index) => {
                                return (
                                    <div className="items-manage-content-overview" key={data._id}>
                                        {index === 0 && <div className="items-manage-content-header">
                                            <div className="content-header">
                                                <h3>No.</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Image</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Item Name</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Delivery Date</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Destination</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Cost</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Status</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Actions</h3>
                                            </div>
                                        </div>}
                                        <div className="items-manage-content-data" style={{background: uniquePhoneNumber.indexOf(data.phoneNumber) % 2 !== 0 ? "#ffffff": "#e0e0e0"}}>
                                            <div className="content-data">
                                                <p>{index + 1}</p>
                                            </div>
                                            <div className="content-data">
                                                <div className="image" style={
                                                    {
                                                        background: `url(${process.env.REACT_APP_BACKEND}/images/${data._id}) no-repeat`
                                                    }
                                                }>
                                                </div>
                                                {/* <img src={`${process.env.REACT_APP_BACKEND}/images/${data._id}`}/> */}
                                            </div>
                                            <div className="content-data">
                                                <p>{data.itemName}</p>
                                            </div>
                                            <div className="content-data">
                                                <p>{new Date(Number(data.date)).getDate()}/{new Date(Number(data.date)).getMonth() + 1}/{new Date(Number(data.date)).getFullYear()} {new Date(Number(data.date)).getHours()}:{new Date(Number(data.date)).getMinutes()} {new Date(Number(data.date)).getHours() >= 12 ? 'PM' : 'AM'}</p>
                                            </div>
                                            <div className="content-data" id="destination">
                                                {/* <button onClick={() =>{
                                                    alert(getCityStart(data.initializeBranchId))
                                                }}>click</button> */}
                                                {/* <p>{getCityStart(data.itemName)}</p> */}
                                                <p>{allBranchOwners.map(branch => {
                                                    if (branch._id === data.initializeBranchId) {
                                                        return branch.city
                                                    }
                                                })} -&gt; {allBranchOwners.map(branch => {
                                                    if (branch._id === data.finalBranchId) {
                                                        return branch.city
                                                    }
                                                })}</p>
                                            </div>
                                            <div className="content-data">
                                                <p>${data.cost}</p>
                                            </div>
                                            <div className="content-data">
                                                <p id={data.status !== "pending" ? "status-true" : "status-false"} style={{background: data.status !== "pending" ? "" : "orange", textTransform: "uppercase"}}>{data.status !== "pending" ? "Delivered" : "Incoming"}</p>
                                            </div>
                                            <div className="content-data">
                                                <button onClick={() => showItemDetail(data._id)}><i className="fa fa-eye"></i></button>
                                                <button id="delete-btn" onClick={() => {
                                                    setShowAlertDelete(true);
                                                    setIdToDelete(data._id);
                                                }}><i className="fa fa-trash"></i></button>
                                                {/* <button><i className="fa fa-pencil" onClick={() => {
                                                    setShowAddItem(true);
                                                    setGetIdEdit(data._id);
                                                    setItemName(data.itemName);
                                                    setItemPhoneNumber(data.phoneNumber);
                                                    setItemWeight(data.weight);
                                                    setItemDescription(data.description);
                                                }}></i></button>
                                                <button onClick={() => {
                                                    setShowAlertDelete(true);
                                                    setIdToDelete(data._id);
                                                }}><i className="fa fa-trash"></i></button>
                                                <button onClick={() => getInvoiceByPhoneNumber(data.phoneNumber)}><i className="fa fa-file-pdf-o"></i></button> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* {filteredBranchItems.length > 0 && <div className="items-delivered">
                            <button onClick={markAsDelivered}>Mark As Delivered</button>
                        </div>} */}
                    </div>
                </div>}
                {(!setting && tab === 2) && <div className="branch-owner-overview">
                    <div className="branch-owner-overview-title">
                        <h1>Items Management Dashboard {allItemsInBranch.length > 0 && "- " + allItemsInBranch.length}</h1>
                    </div>
                    {allItemsInBranch.length > 0 && <div className="branch-owner-item-functions">
                        <div className="left-functions">
                            <button onClick={handleSelectAllItems} style={{background: isSelectAll ? "gray" : "", cursor: isSelectAll ? "no-drop" : ""}} disabled={isSelectAll}>Select All Items</button>
                            {isSelectAll && <button onClick={() => {
                                setIsSelectAll(false);
                                setSelectedItems([]);
                            }}>Cancel</button>}
                        </div>
                        <div className="right-functions">

                        </div>
                    </div>}
                    <div className="add-item">
                        {allItemsInBranch.length === 0 && <h3>Please Add An Item!</h3>}
                        {allItemsInBranch.length > 0 && <h3>Final Destination: <span>{allBranchOwners.map(data => data._id === allFinalBranches[filterNumber] && data.city)}</span></h3>}
                        <button onClick={() => {
                            setShowAddItem(true);
                            setGetIdEdit("");
                            setPackageName("");
                            setItemPhoneNumber("");
                            setItemDescription("");
                            setItemWeight("");
                            setItemCost("");
                            setSelectedFile(null);
                            setInputFileValue("");
                            setItemReceiver("");
                        }}><i className="fa fa-plus"></i>Add An Item</button>
                    </div>
                    {allItemsInBranch.length === 0 && <div className="no-item">
                        <div className="no-item-content">
                            <i className="fa fa-cube"></i>
                            <h1>No Pending Item Found!</h1>
                        </div>
                    </div>}
                    <div className="items-manage-content">
                        {
                            (filteredBranchItems.length > 0 && allItemsInBranch.length > 0) && filteredBranchItems.filter(item => item.status === "pending").map((data, index) => {
                                return (
                                    <div className="items-manage-content-overview" key={data._id}>
                                        {index === 0 && <div className="items-manage-content-header">
                                            <div className="content-header">
                                                <h3>No.</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Image</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Package Name</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Delivery Date</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Destination</h3>
                                                <button onClick={() => setShowFilter(true)}>Filter</button>
                                            </div>
                                            <div className="content-header">
                                                <h3>Cost</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Status</h3>
                                            </div>
                                            <div className="content-header">
                                                <h3>Actions</h3>
                                            </div>
                                        </div>}
                                        <div className="items-manage-content-data">
                                            <div className="content-data">
                                                <p>{index + 1}. <b>{data.packageCode}</b></p>
                                                {!selectedItems.includes(data._id) && <div className="select-delivered" onClick={() => handleSelectDelivered(data._id)}>
                                                </div>}
                                                {selectedItems.includes(data._id) && <div className="select-delivered" onClick={() => handleRemoveSelectDelivered(data._id)}>
                                                    {selectedItems.includes(data._id) && <i className="fa fa-check"></i>}
                                                </div>}
                                            </div>
                                            <div className="content-data">
                                                <div className="image" style={
                                                    {
                                                        background: `url(${process.env.REACT_APP_BACKEND}/images/${data._id}) no-repeat`
                                                    }
                                                }>
                                                </div>
                                            </div>
                                            <div className="content-data">
                                                <p>{data.packageName}</p>
                                            </div>
                                            <div className="content-data">
                                                <p>{new Date(Number(data.date)).getDate()}/{new Date(Number(data.date)).getMonth() + 1}/{new Date(Number(data.date)).getFullYear()} {new Date(Number(data.date)).getHours()}:{new Date(Number(data.date)).getMinutes()} {new Date(Number(data.date)).getHours() >= 12 ? 'PM' : 'AM'}</p>
                                            </div>
                                            <div className="content-data" id="destination">
                                                <p>{allBranchOwners.map(branch => {
                                                    if (branch._id === data.initializeBranchId) {
                                                        return branch.city
                                                    }
                                                })} -&gt; {allBranchOwners.map(branch => {
                                                    if (branch._id === data.finalBranchId) {
                                                        return branch.city
                                                    }
                                                })}</p>
                                            </div>
                                            <div className="content-data">
                                                <p>${data.cost}</p>
                                            </div>
                                            <div className="content-data">
                                                <p id={data.status !== "pending" ? "status-true" : "status-false"}>{data.status !== "pending" ? "Delivered" : "Pending"}</p>
                                            </div>
                                            <div className="content-data">
                                                <button onClick={() => showItemDetail(data._id)}><i className="fa fa-eye"></i></button>
                                                <button><i className="fa fa-pencil" onClick={() => {
                                                    setShowAddItem(true);
                                                    setGetIdEdit(data._id);
                                                    setPackageName(data.packageName);
                                                    setItemPhoneNumber(data.phoneNumber);
                                                    setItemWeight(data.weight);
                                                    setItemDescription(data.description);
                                                    setItemReceiver(data.receiver);
                                                    setSelectedFile(null);
                                                }}></i></button>
                                                <button onClick={() => {
                                                    setShowAlertDelete(true);
                                                    setIdToDelete(data._id);
                                                }}><i className="fa fa-trash"></i></button>
                                                <button onClick={() => getInvoiceByPhoneNumber(data.phoneNumber)}><i className="fa fa-file-pdf-o"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {allItemsInBranch.length > 0 && <div className="items-delivered">
                            <button title={selectedItems === 0 && "Please select an item or more items to get delivered!"} onClick={markAsDelivered} style={{background: selectedItems.length === 0 ? "gray" : "", cursor: selectedItems.length == 0 ? "no-drop" : ""}} disabled={selectedItems.length === 0}>Mark As Delivered</button>
                        </div>}
                    </div>
                </div>}
                {(!setting && tab === 4) && <div className="branch-owner-overview">
                    <div className="branch-owner-overview-title">
                        <h1>Items History {history.filter(hist => JSON.parse(hist.items)[0]?.initializeBranchId === profile).length > 0 && "- " + history.filter(hist => JSON.parse(hist.items)[0]?.initializeBranchId === profile).length}</h1>
                    </div>
                    {history.filter(hist => JSON.parse(hist.items)[0]?.initializeBranchId === profile).length === 0 && <div className="no-item">
                        <div className="no-item-content">
                            <i className="fa fa-cube"></i>
                            <h1>No History Item Found!</h1>
                        </div>
                    </div>}
                    <div className="branch-owner-all-history-container">
                        <div className="branch-owner-all-history">
                            {
                                history.length > 0 && history.filter(hist => JSON.parse(hist.items)[0]?.initializeBranchId === profile).map((data, index) => {
                                    return (
                                        <div className="item-history" key={data._id}>
                                            <h3>Date: {new Date(Number(data.date)).getDate()}/{new Date(Number(data.date)).getMonth() + 1}/{new Date(Number(data.date)).getFullYear()} {new Date(Number(data.date)).getHours() >= 12 ? new Date(Number(data.date)).getHours() - 12 : new Date(Number(data.date)).getHours()}:{new Date(Number(data.date)).getMinutes()} {new Date(Number(data.date)).getHours() >= 12 ? "PM" : "AM"}</h3>
                                            <p><span>To Branch</span>: {allBranchOwners.map(branch => branch["_id"] === endingLocationsHistory[index] && branch.city).filter(city => city !== false)[0]}</p>
                                            <i>{JSON.parse(data.items).length} Item{JSON.parse(data.items).length > 1 ? "s" : ""}:</i>
                                            <ul>
                                                {
                                                    JSON.parse(data.items).map((item, index) => {
                                                        return (
                                                            <li key={item._id}>{index + 1}. {item.itemName} - ${item.cost}</li>
                                                        )
                                                    })
                                                }
                                                <li style={{fontWeight: "600", background: "unset"}}>Total: ${JSON.parse(data.items).map(cost => Number(cost.cost)).reduce((a, b) => a + b)}</li>
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>}
                {setting && <BranchOwnerProfile profile={profile} username={username} email={email} phone={phone} address={address} city={city} state={state} postal={postal} description={description} gender={gender} profileImage={getProfile} changes={changes} setChanges={setChanges} />}
            </div>
            {/* {!setting && <div className="admin-dashboard-container">
                {tab === 1 && <BranchOwnerList/>}
            </div>} */}
        </div>
    )
}

export default BranchOwnerDashboard;