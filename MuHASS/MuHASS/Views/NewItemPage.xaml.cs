using MuHASS.Models;
using MuHASS.ViewModels;
using Xamarin.Forms;

namespace MuHASS.Views
{
    public partial class NewItemPage : ContentPage
    {
        public Item Item { get; set; }

        public NewItemPage()
        {
            InitializeComponent();
            BindingContext = new NewItemViewModel();
        }
    }
}